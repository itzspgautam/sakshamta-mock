import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/config/database";
import Admin from "@/models/AdminSchema";
import { generateAdminJWT } from "@/utils/jwtUtils";
import isAdmin from "@/middleware/isAdmin";
connectDB();

const registerAdmin = async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({success:false, message: "Method Not Allowed" });
  }

  
  const { name, email, password } = req.body;

  if (!name || !email! || !password) {
    return res
      .status(405)
      .json({success:false, message: "Name, email and password is required." });
  }

  try {
    const isUserRegistered = await Admin.findOne({ email });
    if (isUserRegistered) {
      return res
        .status(405)
        .json({success:false, message: "This email is already registered!" });
      return;
    }
    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();

    const jwToken = await generateAdminJWT(newAdmin);
    res.status(200).json({ admin: newAdmin, success:true, message:"Registered sucessfully!", token:jwToken });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
export default isAdmin(registerAdmin)