import { AdminInterface } from "@/interface/AdminInterface";
import mongoose, { Document, Schema, Model, AnyArray } from "mongoose";
import { CandidateInterface } from "@/interface/CandidateInterface";

let Candidate: Model<CandidateInterface>;

if (!mongoose.models.Candidate) {
  const CandidateSchema = new Schema<CandidateInterface>({
    name: {
      type: String,
      required: true,
    },
    bsebUniqueid: {
      type: String,
      required: true,
      unique: true,
    },

    dob: {
      type: Date,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    sign: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "admin",
      required: true,
    },
    exam: {
      type: mongoose.Schema.ObjectId,
      ref: "exam",
      required: true,
    },
  });

  Candidate = mongoose.model<CandidateInterface>("Candidate", CandidateSchema);
} else {
  Candidate = mongoose.model<CandidateInterface>("Candidate");
}

export default Candidate;
