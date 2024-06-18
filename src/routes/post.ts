import { Request, Response, Router } from "express";
import { ResultFunction } from '../helpers/utils';
import { ReturnStatus } from '../types/generic';
import authMiddleWare from '../middlewares/authMiddleware';
import { createPostController, deletePostController, getAllPostsByOneUserController, getOnePostByOneUserController, likePostController, updatePostController } from "../controllers/post";

const postRouter = Router()

postRouter.post('/createpost', authMiddleWare, createPostController)
postRouter.get('/getposts/:userId', authMiddleWare, getAllPostsByOneUserController)
postRouter.get('/getpost/:postId', authMiddleWare, getOnePostByOneUserController)
postRouter.put('/updatepost/:postId', authMiddleWare, updatePostController)
postRouter.put('/deletepost/:postId', authMiddleWare, deletePostController)
postRouter.put('/like/:postId', authMiddleWare, likePostController)

export default postRouter