import { Request, Response, Router } from "express";
import authMiddleWare from '../middlewares/authMiddleware';
import { followUserController, getAllUsersController, getUserController, updateUserController } from "../controllers/user";

const userRouter = Router()

userRouter.get('/:userId', authMiddleWare, getUserController)
userRouter.put('/update/:userId', authMiddleWare, updateUserController)
userRouter.put('/follow/:followingId', authMiddleWare, followUserController)
userRouter.get('/getallusers', authMiddleWare, getAllUsersController)

export default userRouter