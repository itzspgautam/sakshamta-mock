// pages/api/saveParticipation.ts

import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/config/database";
import { ParticipateInterface } from "@/interface/ExamInterface";
import Candidate from "@/models/candidate/candidateSchema";
import Exam from "@/models/exam/ExamSchema";
import Participate from "@/models/participate/ParticipateSchema";
import Question from "@/models/exam/QuestionSchema";
import isCandidate from "@/middleware/isCandidate";

connectDB();

const saveParticipationAPI = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const {candidate} = req as any;
    console.log("candiate id", candidate)
    const { exam, answers }: ParticipateInterface = req.body;

    // Validate incoming data
    if (!exam  || !answers || !Array.isArray(answers)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid participation data." });
    }

    // Check if the candidate exists
    const existingCandidate = await Candidate.findById(candidate);
    if (!existingCandidate) {
      return res
        .status(404)
        .json({ success: false, message: "Candidate not found." });
    }

    // Check if the exam exists
    const existingExam = await Exam.findById(existingCandidate?.exam);
    if (!existingExam) {
      return res
        .status(404)
        .json({ success: false, message: "Exam not found." });
    }


    //check if already partici[pated or not
    const isAlreadySubmitted = await Participate.findOne({ candidate, exam });
    if (isAlreadySubmitted) {
      return res
        .status(400)
        .json({ success: false, message: "Already participated." });
    }

      // Check if all question IDs exist
      for (const answer of answers) {
        const existingQuestion = await Question.findById(answer.question);
        if (!existingQuestion) {
          return res.status(400).json({ success: false, message: "One or more question is invalid." });
        }
      }


    // Create a new participation
    const newParticipation = new Participate({
      exam,
      candidate,
      answers,
    });

    await newParticipation.save();

    res
      .status(201)
      .json({
        success: true,
        participation: newParticipation,
        message: "Participation data saved successfully!",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export default isCandidate(saveParticipationAPI);
