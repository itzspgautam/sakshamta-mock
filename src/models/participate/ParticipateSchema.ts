import { AdminInterface } from "@/interface/AdminInterface";
import mongoose, { Document, Schema, Model, AnyArray } from "mongoose";
import { ParticipateInterface } from "@/interface/ExamInterface";

let Participate: Model<ParticipateInterface>;

if (!mongoose.models.Participate) {
  const ParticipateSchema = new Schema<ParticipateInterface>({
    exam: {
      type:Schema.Types.ObjectId,
      ref: "exam",
      required: true,
    },
    candidate: {
      type: Schema.Types.ObjectId,
      ref: "candidate",
      required: true,
    },
    answers: [
      {
        question: {
          type: mongoose.Schema.ObjectId,
          ref: "question",
          required: true,
        },
        status: {
          type:String,
          enum:['ATT','TAG','TAGATT','UNATT'],
          required:true
        },
        answer:{
          type:String,
          enum:['A','B','C','D',null],
          default: null
        }
      },
    ],
  });

  Participate = mongoose.model<ParticipateInterface>(
    "Participate",
    ParticipateSchema
  );
} else {
  Participate = mongoose.model<ParticipateInterface>("Participate");
}

export default Participate;
