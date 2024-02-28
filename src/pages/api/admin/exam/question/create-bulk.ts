import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/config/database";
import { QuestionInterface } from "@/interface/ExamInterface";
import Question from "@/models/exam/QuestionSchema";
import Exam from "@/models/exam/ExamSchema";
import isAdmin from "@/middleware/isAdmin";

connectDB();

const createBulk =  async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }
  
  const {admin} = req as any;
  const { examId, questions } = req.body;

  if (
    !examId ||
    !questions ||
    !Array.isArray(questions) ||
    questions.length === 0
  ) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Exam ID and a non-empty array of questions are required.",
      });
  }

  try {
    const isValidExam = await Exam.findById(examId);
    if (!isValidExam) {
      return res
        .status(400)
        .json({ success: false, message: "Exam ID is invalid." });
    }

    const questionsWithExamId: QuestionInterface[] = questions.map(
      (question: any) => ({
        ...question,
        exam: examId,
        createdBy:admin
      })
    );

    const createdQuestions: QuestionInterface[] = await Question.insertMany(
      questionsWithExamId
    );

    res
      .status(201)
      .json({
        success: true,
        questions: createdQuestions,
        message: "Question uploaded in bulk.",
      });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export default isAdmin(createBulk)