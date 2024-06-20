import { NextFunction, Request, Response } from 'express';
import { userFactory } from '../services/factories';
import { IFollower } from '../types/post';
import { GetUser, IUpdateUser, UpdateUser } from '../types/user';


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


export const getUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: GetUser = {
        userId: req.params.userId,
    };
    const response = await userFactory().getUser(input);
    return res.status(response.code).json(response);
};

export const getAllUsersController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: GetUser = {
        userId: req.params.userId,
    };

    const response = await userFactory().getAllUsers(input);
    return res.status(response.code).json(response);
};

export const updateUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: IUpdateUser = {
        userId: req.params.userId,
        name: req.body.name,
        email: req.body.email,
        description: req.body.description
    };
    const response = await userFactory().getUser(input);
    return res.status(response.code).json(response);
};