import { Request, Response, Router } from "express";
import { ResultFunction } from '../helpers/utils';
import { ReturnStatus } from '../types/generic';
import authMiddleWare from '../middlewares/authMiddleware';
import { createPostController, getAllPostsByOneUserController, getOnePostByOneUserController } from "../controllers/post";

const postRouter = Router()

postRouter.use('/createpost', authMiddleWare, createPostController)
postRouter.use('/getposts/:userId', authMiddleWare, getAllPostsByOneUserController)
postRouter.use('/getpost/:userId', authMiddleWare, getOnePostByOneUserController)

export default postRouter