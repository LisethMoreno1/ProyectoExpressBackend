import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  isVerified?: boolean;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false }
});

export const User = mongoose.model<IUser>('User', UserSchema);
