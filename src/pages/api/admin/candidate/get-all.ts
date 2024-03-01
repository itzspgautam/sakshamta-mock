import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/config/database";
import { ExamInterface } from "@/interface/ExamInterface";
import Exam from "@/models/exam/ExamSchema";
import isAdmin from "@/middleware/isAdmin";
import Question from "@/models/exam/QuestionSchema";
import Candidate from "@/models/candidate/candidateSchema";

connectDB();

const getCandidates = async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    const candidates = await Candidate.find();
    res.status(201).json({
      success: true,
      candidates, 
      message: "Candidates Fetched successfully!",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export default isAdmin(getCandidates);
