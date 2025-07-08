import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  dob: string;
  googleId?: string;
  otp?: string;
  otpExpiry?: Date;
  notes: Schema.Types.ObjectId[];
}

interface UserModel extends Model<IUser> {}

const userSchema = new Schema<IUser, UserModel>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: String,
    required: false,
    default: null,
  },
  googleId: {
    type: String,
    required: false,
  },
  otp: {
    type: String,
    required: false,
  },
  otpExpiry: { type: Date },
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
});

export default mongoose.model<IUser, UserModel>('User', userSchema);
