import mongoose, { Schema, Types } from "mongoose";
import { ISignup, ISignupSchema } from "../types/auth";
import { comparePassword, hashPassword } from "../helpers/hash";

const UserSchema: Schema = new Schema<ISignupSchema>({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    description: { type: String, required: false },
    followerCount: { type: Number, required: false, default: 0 },
    followingCount: { type: Number, required: false, default: 0 }
})

UserSchema.pre('save', async function (next) {
    const user = this;
    const hash = await hashPassword(this.password)
    this.password = hash

    next()
})

UserSchema.methods.isValidPassword = async function (password: string) {
    const user = this;
    return comparePassword(password, user.password)
}

const User = mongoose.model<ISignup>('User', UserSchema)
export default User