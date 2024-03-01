import mongoose, { Document, ObjectId, mongo } from "mongoose";

export interface ExamInterface extends Document {
  title: string;
  venue: string;
  duration: number; //in Minute
  createdBy: ObjectId;
  examDate: any;
}

export interface QuestionOption extends Document {
  option: string;
  option_en: string;
  option_hi: string;
}

export interface QuestionInterface extends Document {
  exam: ObjectId;
  createdBy: ObjectId;
  _id?: string;
  question: {
    hi: string;
    en: string;
  };
  options: QuestionOption[];
  correctOption: string;
}

export interface AnswerInterface extends Document {
  question: ObjectId | null;
  status: string | null;
  answer: string | null;
}

export interface ParticipateInterface extends Document {
  candidate: ObjectId;
  exam: ObjectId | any;
  answers: AnswerInterface[];
}
