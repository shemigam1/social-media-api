import mongoose, { Schema, Types } from "mongoose";
// import { ISignup } from "../types/auth";
import { IPost } from "../types/post";

const PostSchema: Schema = new Schema<IPost>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', unique: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    likes: { type: [Schema.Types.ObjectId], required: false, default: [] },
    createdAt: { type: Date, default: Date.now }
})

const Post = mongoose.model<IPost>('Post', PostSchema)
export default Post