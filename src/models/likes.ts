import mongoose, { Schema, Types } from "mongoose";
// import { ISignup } from "../types/auth";
import { ILike } from "../types/post";

const LikeSchema: Schema = new Schema<ILike>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', unique: true },
    postId: { type: Schema.Types.ObjectId, required: true, ref: 'Post', unique: true },

})

const Like = mongoose.model<ILike>('Follow', LikeSchema)
export default Like