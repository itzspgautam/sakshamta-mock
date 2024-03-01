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
    const GetExam = await Exam.findById(exam);
    if (!GetExam) {
        return res.status(400).json({
            success: false,
            message: "Exam is invalid.",
          });
    }
    const delQuestion = await Question.deleteMany({exam:GetExam?._id})
    const delExam = await Exam.deleteOne({_id:GetExam._id})
    res.status(201).json({
      success: true,
      message: "exam "+GetExam?.title+" and its "+delQuestion?.deletedCount+" Questions Deleted successfully!",
    });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export default isAdmin(createExam);
