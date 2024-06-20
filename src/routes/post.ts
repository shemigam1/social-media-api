import { Request, Response, Router } from "express";
import { ResultFunction } from '../helpers/utils';
import { ReturnStatus } from '../types/generic';
import authMiddleWare from '../middlewares/authMiddleware';
import { commentPostController, createPostController, deletePostController, getAllPostsByOneUserController, getCommentController, getFeedController, getOnePostByOneUserController, likePostController, updatePostController } from "../controllers/post";

const postRouter = Router()

postRouter.get('/feed', authMiddleWare, getFeedController)
postRouter.post('/createpost', authMiddleWare, createPostController)
postRouter.get('/getposts/:userId', authMiddleWare, getAllPostsByOneUserController)
postRouter.get('/getpost/:postId', authMiddleWare, getOnePostByOneUserController)
postRouter.put('/updatepost/:postId', authMiddleWare, updatePostController)
postRouter.put('/deletepost/:postId', authMiddleWare, deletePostController)
postRouter.put('/like/:postId', authMiddleWare, likePostController)
postRouter.put('/comment/:postId', authMiddleWare, commentPostController)
postRouter.put('/getcomments/:postId', authMiddleWare, getCommentController)

export default postRouter