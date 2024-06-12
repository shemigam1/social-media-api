import { NextFunction, Request, Response } from 'express';
import { DeletePost, IPost, PostData, UpdatePost } from '../types/post';
import { postFactory } from '../services/factories';


// export interface IPost {
//     userId: Schema.Types.ObjectId;
//     title: string;
//     description: string;
//     likeCount: Schema.Types.ObjectId[];
//     createdAt: Date;
// }

export const createPostController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: IPost = {
        userId: req.body.userId,
        // postId: "",
        title: req.body.title,
        description: req.body.description,
        likeCount: 0,
        deleted: false
        // createdAt: Date.now()
    };
    const response = await postFactory().createPost(input);
    return res.status(response.code).json(response);
};

// get all posts by one user
export const getAllPostsByOneUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: PostData = {
        userId: req.params.userId,
        // postId: "",
        title: "",
        description: ""
    };
    const response = await postFactory().getAllPostsByOneUser(input);
    return res.status(response.code).json(response);
};
// get one post
export const getOnePostByOneUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: PostData = {
        // userid is placeholder for postid
        userId: req.params.postId,
        // postId: req.params.id,
        title: "",
        description: ""
    };
    const response = await postFactory().getOnePostByOneUser(input);
    return res.status(response.code).json(response);
};
// get random posts from random users (feed)
// update post
export const updatePostController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: UpdatePost = {
        // userid is placeholder for postid
        userId: req.params.postId,
        // postId: req.params.id,
        data: {
            title: req.body.title,
            description: req.body.description
        }
    };
    const response = await postFactory().updatePost(input);
    return res.status(response.code).json(response);
};

export const deletePostController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: DeletePost = {
        // userid is placeholder for postid
        userId: req.params.postId,
        // postId: req.params.id,
        data: {
            deleted: true
        }
    };
    const response = await postFactory().deletePost(input);
    return res.status(response.code).json(response);
};
// delete post