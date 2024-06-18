import mongoose, { Schema, Types } from "mongoose";
// import { ISignup } from "../types/auth";
import { IFollower } from "../types/post";

const FollowerSchema: Schema = new Schema<IFollower>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', unique: true },
    followingId: { type: Schema.Types.ObjectId, required: true, ref: 'User', unique: true },

})

const Follower = mongoose.model<IFollower>('Follower', FollowerSchema)
export default Follower