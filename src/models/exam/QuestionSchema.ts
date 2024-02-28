import { AdminInterface } from "@/interface/AdminInterface";
import mongoose, { Document, Schema, Model, AnyArray } from "mongoose";
import { ExamInterface, QuestionInterface } from "@/interface/ExamInterface";

let Question: Model<QuestionInterface>;

if (!mongoose.models.Question) {
  const QuestionSchema = new Schema<QuestionInterface>({
    exam:{
      type: mongoose.Schema.ObjectId,
      ref:"Exam"
    },
    question: {
      hi: {
        type: String,
        required: true,
      },
      en: {
        type: String,
        required: true,
      },
    },
 
    options: [{
      option: {
        type: String,
        enum:['A','B','C','D'],
        required: true,
      },
      option_en: {
        type: String,
        required: true,
      },
      option_hi: {
        type: String,
        required: true,
      },
    }],
    correctOption:{
      type:String,
      enum:['A','B','C','D'],
      required:true
    },
    createdBy:{
      type:mongoose.Schema.ObjectId,
      ref:'admin',
      required:true
    }
  });

  Question = mongoose.model<QuestionInterface>("Question", QuestionSchema);
} else {
  Question = mongoose.model<QuestionInterface>("Question");
}

export default Question;
