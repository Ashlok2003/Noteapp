import mongoose, {
  Document,
  Model,
  Schema,
} from 'mongoose';

export interface IUser extends Document {
  email: string;
  password?: string;
  googleId?: string;
  otp?: string;
  otpExpiry?: Date;
  notes: Schema.Types.ObjectId[];
}

interface UserModel extends Model<IUser> {}

const userSchema = new Schema<IUser, UserModel>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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

export default mongoose.model<IUser, UserModel>(
  'User',
  userSchema,
);
