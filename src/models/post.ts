import mongoose, { Schema, Types } from "mongoose";
// import { ISignup } from "../types/auth";
import { IPost } from "../types/post";

const PostSchema: Schema = new Schema<IPost>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', unique: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    likeCount: { type: Number, required: false, default: 0 },
    // createdAt: { type: Date, default: Date.now }
}, { timestamps: true })

const Post = mongoose.model<IPost>('Post', PostSchema)
export default Post