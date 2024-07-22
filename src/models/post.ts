import mongoose, { Schema, Types } from "mongoose";
// import { ISignup } from "../types/auth";
import { IPostSchema } from "../types/post";

const PostSchema: Schema = new Schema<IPostSchema>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: false },
    likeCount: { type: Number, required: false, default: 0 },
    deleted: { type: Boolean, required: false, default: false },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true })

const Post = mongoose.model<IPostSchema>('Post', PostSchema)
export default Post