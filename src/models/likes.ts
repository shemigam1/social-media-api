import mongoose, { Schema, Types } from "mongoose";
// import { ISignup } from "../types/auth";
import { ILike } from "../types/post";

const LikeSchema: Schema = new Schema<ILike>({
    userId: { type: String, required: true, unique: true },
    postId: { type: String, required: true, unique: true },

})

const Like = mongoose.model<ILike>('Follow', LikeSchema)
export default Like