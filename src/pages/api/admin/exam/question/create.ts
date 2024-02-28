import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/config/database";
import { QuestionInterface } from "@/interface/ExamInterface";
import Question from "@/models/exam/QuestionSchema";
import Exam from "@/models/exam/ExamSchema";
import isAdmin from "@/middleware/isAdmin";

connectDB();

const createQuestion =  async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({success:false, message: "Method Not Allowed" });
  }
  const {admin} = req as any;
  const { examId, question, options,correctOption } = req.body;

  if (!examId || !question || !options || !Array.isArray(options) || options.length === 0) {
    return res.status(400).json({success:false, message: "Exam ID, question, and a non-empty array of options are required." });
  }

  try {
    const isValidExam = await Exam.findById(examId);
    if (!isValidExam) {
      return res
        .status(400)
        .json({ success: false, message: "Exam ID is invalid." });
    }


    const newQuestion: QuestionInterface = new Question({
      exam: examId,
      createdBy:admin,
      question,
      options,
      correctOption
    });

    await newQuestion.save();

    res.status(201).json({ success: true, question: newQuestion, message:"Question saved sucessfully!" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export default isAdmin(createQuestion)