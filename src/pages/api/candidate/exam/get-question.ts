import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/config/database";
import { QuestionInterface } from "@/interface/ExamInterface";
import Question from "@/models/exam/QuestionSchema";
import isCandidate from "@/middleware/isCandidate";
import Candidate from "@/models/candidate/candidateSchema";
import Participate from "@/models/participate/ParticipateSchema";

connectDB();

const getquestions =  async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({success:false, message: "Method Not Allowed" });
  }

  const { candidate } = req as any;

  try {

    const isValidCandidate = await Candidate.findById(candidate);
    if(!isValidCandidate){
      return res
      .status(404)
      .json({ success: false, message: "Candidate not found." });
    }

    //check if already partici[pated or not
    const isAlreadySubmitted = await Participate.findOne({candidate:isValidCandidate?._id, exam:isValidCandidate?.exam });
    if (isAlreadySubmitted) {
      return res
        .status(400)
        .json({ success: false, message: "Already participated." });
    }


    const questions: QuestionInterface[] = await Question.find({ exam: isValidCandidate?.exam });

    res.status(200).json({ success: true, data: questions, message:"Question fetched successfully!" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
export default isCandidate(getquestions)