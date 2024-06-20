import { Schema } from "mongoose"

export type GetUser = {
    userId: Schema.Types.ObjectId | string
}

export interface IUpdateUser {
    userId: Schema.Types.ObjectId | string
    name: string
    email: string
    description: string
}

export type UpdateUser = {
    name: string
    email: string
    description: string
}