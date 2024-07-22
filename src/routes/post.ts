import { Request, Response, Router } from "express";
import { ResultFunction } from '../helpers/utils';
import { ReturnStatus } from '../types/generic';
import authMiddleWare from '../middlewares/authMiddleware';
import { commentPostController, createPostController, deletePostController, getAllPostsByOneUserController, getCommentController, getFeedController, getOnePostByOneUserController, likePostController, updatePostController } from "../controllers/post";

const postRouter = Router()

postRouter.get('/feed', authMiddleWare, getFeedController)
postRouter.post('/', authMiddleWare, createPostController)
postRouter.get('/:userId/all', authMiddleWare, getAllPostsByOneUserController)
postRouter.get('/:postId', authMiddleWare, getOnePostByOneUserController)
postRouter.put('/:postId', authMiddleWare, updatePostController)
postRouter.delete('/:postId', authMiddleWare, deletePostController)
postRouter.put('/:postId/like', authMiddleWare, likePostController)
postRouter.put('/:postId/comment', authMiddleWare, commentPostController)
postRouter.get('/:postId/comment', authMiddleWare, getCommentController)

export default postRouter