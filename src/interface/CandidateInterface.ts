import { Document, ObjectId } from "mongoose";

export interface CandidateInterface extends Document {
  name: string;
 roll:string,
 applicationNo:string,
 bsebUniqueid:string,
 dob:Date,
 photo:string,
 sign:string,
 createdBy:ObjectId,
 exam:ObjectId
}
