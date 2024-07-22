import { Request, Response, Router } from "express";
import authMiddleWare from '../middlewares/authMiddleware';
import { followUserController, getAllUsersController, getUserController, updateUserController } from "../controllers/user";

const userRouter = Router()

userRouter.get('/:userId', authMiddleWare, getUserController)
userRouter.put('/:userId', authMiddleWare, updateUserController)
userRouter.put('/:followingId/follow', authMiddleWare, followUserController)
userRouter.get('/', authMiddleWare, getAllUsersController)

export default userRouter