import mongoose, { Document, Schema } from 'mongoose';

export interface INote extends Document {
  userId: mongoose.Types.ObjectId; // ref: User
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model<INote>('Note', NoteSchema);
