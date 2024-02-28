import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/config/database";
import Admin from "@/models/AdminSchema";
import { generateAdminJWT, generateCandidateJWT } from "@/utils/jwtUtils";
import Candidate from "@/models/candidate/candidateSchema";
import { CandidateInterface } from "@/interface/CandidateInterface";
connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(405).json({ message: "username and password is required." });
  }

  try {
    let isMatch=false;
    const isValidCandidate:CandidateInterface = await Candidate.findOne({ applicationNo:username }) as CandidateInterface;
    // if(isValidCandidate){
    //     return true
    // }

    
    if (isValidCandidate) {
      const jwToken = await generateCandidateJWT(isValidCandidate);
      res
        .status(200)
        .json({
          sucess: true,
          candidate: isValidCandidate,
          token: jwToken,
          message: "Logged in sucessfully!",
        });
      return;
    }

    res
      .status(200)
      .json({ sucess: false, message: "username and password is invalid!" });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
