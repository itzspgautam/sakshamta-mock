import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/config/database";
import Admin from "@/models/AdminSchema";
import { generateAdminJWT } from "@/utils/jwtUtils";
import bcrypt from "bcrypt";
connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(405).json({ message: "email and password is required." });
  }

  try {
    let isMatch=false;
    const isValidAdmin = await Admin.findOne({ email });
    if(isValidAdmin){
       isMatch = await bcrypt.compare(password, isValidAdmin?.password);
    }
    
    if (isValidAdmin && isMatch) {
      const jwToken = await generateAdminJWT(isValidAdmin);
      res
        .status(200)
        .json({
          sucess: true,
          admin: isValidAdmin,
          token: jwToken,
          message: "Logged in sucessfully!",
        });
      return;
    }

    res
      .status(401)
      .json({ sucess: false, message: "Email and password is invalid!" });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
