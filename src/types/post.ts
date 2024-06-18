import { Schema } from "mongoose";

export interface IPost {
    userId: Schema.Types.ObjectId | string;
    // postId: Schema.Types.ObjectId | string;
    title: string;
    description: string;
    likeCount: number;
    deleted: boolean;
}

export type PostData = {
    userId: Schema.Types.ObjectId | string;
    // postId: Schema.Types.ObjectId | string;
    title: string;
    description: string;
};

export type UpdatePost = {
    postId: Schema.Types.ObjectId | string;
    data: {
        userId: Schema.Types.ObjectId | string;
        title: string;
        description: string
    }
}

// export interface IUpdatePost {
//     title: string;
//     description: string
// }

export type DeletePost = {
    userId: Schema.Types.ObjectId | string;
    data: {
        deleted: boolean
    }
}

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
    userId: Schema.Types.ObjectId | string;
    followingId: Schema.Types.ObjectId | string;
}

export interface ILike {
    userId: Schema.Types.ObjectId | string;
    postId: Schema.Types.ObjectId | string;
}

export type LikeData = {
    userId: Schema.Types.ObjectId | string;
    postId: Schema.Types.ObjectId | string
}