import { NextFunction, Request, Response } from 'express';
import { userFactory } from '../services/factories';
import { IFollower } from '../types/post';


// export interface IPost {
//     userId: Schema.Types.ObjectId;
//     title: string;
//     description: string;
//     likeCount: Schema.Types.ObjectId[];
//     createdAt: Date;
// }

export const followUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: IFollower = {
        userId: req.body.userId,
        // postId: "",
        followingId: req.params.followingId,
        // createdAt: Date.now()
    };
    const response = await userFactory().followUser(input);
    return res.status(response.code).json(response);
};