import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/config/database";
import Admin from "@/models/AdminSchema";
import { generateAdminJWT, generateCandidateJWT } from "@/utils/jwtUtils";
import Candidate from "@/models/candidate/candidateSchema";
import { CandidateInterface } from "@/interface/CandidateInterface";
import moment from "moment";
import Participate from "@/models/participate/ParticipateSchema";
import Exam from "@/models/exam/ExamSchema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  await connectDB();

  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(405)
      .json({ message: "username and password is required." });
  }

  try {
    let isMatch = false;

    const isValidCandidate: CandidateInterface = (await Candidate.findOne({
      bsebUniqueid: username,
    })) as CandidateInterface;
    if (isValidCandidate) {
      const dobToPassword = moment(isValidCandidate?.dob).format("DDMMYYYY");
      if (dobToPassword === password) {
        isMatch = true;
      }
    }

    if (isValidCandidate && isMatch) {
      const jwToken = await generateCandidateJWT(isValidCandidate);

      let participation = null;
      const isAlreadySubmitted = await Participate.findOne({
        candidate: isValidCandidate?._id,
        exam: isValidCandidate?.exam,
      });
      const exam = await Exam.findById(isValidCandidate?.exam);

      console.log(isAlreadySubmitted);
      if (isAlreadySubmitted) {
        participation = isAlreadySubmitted;
      }

      res.status(200).json({
        sucess: true,
        candidate: isValidCandidate,
        token: jwToken,
        participation,
        exam,
        message: "Logged in sucessfully!",
      });
      return;
    }

    res
      .status(401)
      .json({ sucess: false, message: "username and password is invalid!" });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
