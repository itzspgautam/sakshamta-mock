import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/config/database";
import { CandidateInterface } from "@/interface/CandidateInterface";
import Candidate from "@/models/candidate/candidateSchema";
import isAdmin from "@/middleware/isAdmin";

connectDB();

const createcandidate = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {

    const {admin} = req as any;
    const {
      name,
      roll,
      applicationNo,
      bsebUniqueid,
      dob,
      photo,
      sign,
      exam
    }: CandidateInterface = req.body;

    // Validate incoming data
    if (!name || !roll || !applicationNo || !bsebUniqueid || !dob || !photo || !sign || !exam) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Create a new candidate
    const newCandidate = new Candidate({
      name,
      roll,
      applicationNo,
      bsebUniqueid,
      dob,
      photo,
      sign,
      createdBy:admin,
      exam
    });

    await newCandidate.save();

    res.status(201).json({ success: true, candidate: newCandidate, message: "Candidate created successfully!" });
  } catch (error) {
    console.error("Error creating candidate:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export default isAdmin(createcandidate);
