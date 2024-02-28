import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/config/database";
import { ExamInterface } from "@/interface/ExamInterface";
import Exam from "@/models/exam/ExamSchema";
import isAdmin from "@/middleware/isAdmin";

connectDB();

const createExam =  async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const {admin} = req as any;
  const { title,duration, venue } = req.body;
  if (!title || !duration || !venue) {
    return res.status(400).json({success:false, message: "Title, duration and venue are required." });
  }

  try {
    const newExam: ExamInterface = new Exam({
      title,
      duration,
      venue,
      createdBy:admin
    });

    await newExam.save();

    res.status(201).json({ success: true, exam: newExam, message:"Exam created successfully!" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
export default isAdmin(createExam);