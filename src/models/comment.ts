import mongoose, { Schema, Types } from "mongoose";
// import { ISignup } from "../types/auth";
import { IComment } from "../types/post";

const CommentSchema: Schema = new Schema<IComment>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', unique: true },
    postId: { type: Schema.Types.ObjectId, required: true, ref: 'User', unique: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

const Comment = mongoose.model<IComment>('Comment', CommentSchema)
export default Comment