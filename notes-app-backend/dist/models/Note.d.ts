import mongoose, { Document } from 'mongoose';
export interface INote extends Document {
    userId: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<INote, {}, {}, {}, mongoose.Document<unknown, {}, INote, {}, {}> & INote & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
