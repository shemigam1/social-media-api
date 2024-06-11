import { Request, Response, Router } from "express";
import { ResultFunction } from '../helpers/utils';
import { ReturnStatus } from '../types/generic';
import authMiddleWare from '../middlewares/authMiddleware';
import { createPostController } from "../controllers/post";

const postRouter = Router()

postRouter.use('/createpost', createPostController)

export default postRouter