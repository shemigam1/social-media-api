import { Schema } from "mongoose";

export interface IPost {
    userId: Schema.Types.ObjectId;
    // postId: Schema.Types.ObjectId | string;
    title: string;
    description: string;
    likeCount: number;
}

export type PostData = {
    userId: Schema.Types.ObjectId;
    // postId: Schema.Types.ObjectId | string;
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

export interface IFollower {
    userId: Schema.Types.ObjectId;
    followingId: Schema.Types.ObjectId;
}

export interface ILike {
    userId: Schema.Types.ObjectId;
    postId: Schema.Types.ObjectId;
}