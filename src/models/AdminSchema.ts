import { AdminInterface } from "@/interface/AdminInterface";
import mongoose, { Document, Schema, Model, AnyArray } from "mongoose";
import bcrypt from 'bcrypt'

let Admin: Model<AdminInterface>;

if (!mongoose.models.Admin) {
  const AdminSchema = new Schema<AdminInterface>({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  });

  // Pre-save hook to hash password before saving to the database
  AdminSchema.pre<AdminInterface>('save', async function(next) {
    const admin = this;
    if (!admin.isModified('password')) {
      return next();
    }
    try {
      const hashedPassword = await bcrypt.hash(admin.password, 10); // 10 is the salt rounds
      admin.password = hashedPassword;
      next();
    } catch (error:any) {
      return next(error);
    }
  });

  Admin = mongoose.model<AdminInterface>("Admin", AdminSchema);
} else {
  Admin = mongoose.model<AdminInterface>("Admin");
}

export default Admin;
