import { Request, Response, Router } from "express";
import authMiddleWare from '../middlewares/authMiddleware';
import { followUserController } from "../controllers/user";

const userRouter = Router()


userRouter.put('/follow/:followingId', authMiddleWare, followUserController)

export default userRouter