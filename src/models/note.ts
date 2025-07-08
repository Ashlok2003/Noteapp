import mongoose, { Document, Model, Schema } from 'mongoose';

export interface INote extends Document {
  content: string;
  userId: Schema.Types.ObjectId;
}

interface NoteModel extends Model<INote> {}

const noteSchema = new mongoose.Schema<INote, NoteModel>({
  content: { type: String, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model<INote, NoteModel>('Note', noteSchema);
