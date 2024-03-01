import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/config/database";
import { ExamInterface } from "@/interface/ExamInterface";
import Exam from "@/models/exam/ExamSchema";
import isAdmin from "@/middleware/isAdmin";
import Question from "@/models/exam/QuestionSchema";

connectDB();

const createExam = async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { admin } = req as any;
  const { exam } = req.body;
  if (!Exam) {
    return res.status(400).json({
      success: false,
      message: "Title, duration and venue are required.",
    });
  }

  try {
    const GetExams = await Exam.find();
    if (!GetExams) {
        return res.status(400).json({
            success: false,
            message: "Exam is invalid.",
          });
    }
    res.status(201).json({
      success: true,
      exams: GetExams,
      message: "Exam Fetched successfully!",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export default isAdmin(createExam);
