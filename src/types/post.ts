import { Schema } from "mongoose";

export interface IPost {
    userId: Schema.Types.ObjectId;
    title: string;
    description: string;
    likes: Schema.Types.ObjectId[];
    createdAt: Date;
}

export type PostData = {
    title: string;
    description: string;
};

export interface IComment {
    userId: Schema.Types.ObjectId;
    postId: Schema.Types.ObjectId;
    comment: string,
    createdAt: Date;
}

export type CommentData = {
    comment: string
}