import mongoose, { Schema, Types } from "mongoose";
// import { ISignup } from "../types/auth";
import { ILike } from "../types/post";

const LikeSchema: Schema = new Schema<ILike>({
    postId: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },

})

const Like = mongoose.model<ILike>('Follow', LikeSchema)
export default Like