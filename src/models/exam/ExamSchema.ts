import { AdminInterface } from "@/interface/AdminInterface";
import mongoose, { Document, Schema, Model, AnyArray } from "mongoose";
import { ExamInterface } from "@/interface/ExamInterface";

let Exam: Model<ExamInterface>;

if (!mongoose.models.Exam) {
  const ExamSchema = new Schema<ExamInterface>({
    title: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    examDate: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "admin",
      required: true,
    },
  });

  Exam = mongoose.model<ExamInterface>("Exam", ExamSchema);
} else {
  Exam = mongoose.model<ExamInterface>("Exam");
}

export default Exam;
