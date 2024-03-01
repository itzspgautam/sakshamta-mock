import { Document, ObjectId } from "mongoose";

export interface CandidateInterface extends Document {
  name: string;
 bsebUniqueid:string,
 dob:Date,
 photo:any,
 sign:any,
 exam:any,
 createdBy?:any
}
