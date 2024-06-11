import { NextFunction, Request, Response } from 'express';
import { IPost } from '../types/post';
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
        title: req.body.title,
        description: req.body.description,
        likeCount: req.body.likes,
        // createdAt: Date.now()
    };
    const response = await postFactory().createPost(input);
    return res.status(response.code).json(response);
};