import { Document } from "mongoose";

export interface AdminInterface extends Document {
  name: string;
  email: string;
  password: string;
}
