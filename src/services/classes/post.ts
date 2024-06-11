import { PostData } from "../../types/post";
import Post from "../../models/post";
import { ResultFunction } from "../../helpers/utils";
import { ReturnStatus } from "../../types/generic";
import { log } from "winston";
import { Schema } from "mongoose";

class PostClass {

    public async createPost(input: PostData) {
        try {
            const { userId, title, description } = input

            console.log('i made it to the class');


            const data: PostData = {
                userId
                , title, description
            }

            console.log(data);
            console.log(typeof (data.userId));



            try {
                console.log('before create post');

                const newPost = await Post.create(data)

                console.log('after create post');

                console.log(newPost);

                return ResultFunction(
                    true,
                    'post created successful',
                    200,
                    ReturnStatus.OK,
                    data
                )

            } catch (error) {
                console.log(error);

                return ResultFunction(
                    false,
                    'something went wrong with creating post',
                    422,
                    ReturnStatus.NOT_OK,
                    null
                );
            }
        } catch (error) {
            return ResultFunction(
                false,
                'something went wrong in the server',
                422,
                ReturnStatus.NOT_OK,
                null
            );
        }
    }

    public async getAllPostsByOneUser(input: PostData) {
        try {
            const { userId } = input
            try {
                const posts = await Post.find({ userId: userId })
                console.log(posts);

                return ResultFunction(
                    true,
                    'post returned successful',
                    200,
                    ReturnStatus.OK,
                    posts
                )


            } catch (error) {
                return ResultFunction(
                    false,
                    'couldnt get posts',
                    422,
                    ReturnStatus.NOT_OK,
                    null
                );
            }
        } catch (error) {
            return ResultFunction(
                false,
                'something went wrong in the server',
                422,
                ReturnStatus.NOT_OK,
                null
            );
        }
    }

    public async getOnePostByOneUser(input: PostData) {
        try {
            const { userId } = input
            try {
                // userid in this case is actually the postid
                const posts = await Post.findById(userId)
                console.log(posts);

                return ResultFunction(
                    true,
                    'post returned successful',
                    200,
                    ReturnStatus.OK,
                    posts
                )


            } catch (error) {
                return ResultFunction(
                    false,
                    'couldnt get posts',
                    422,
                    ReturnStatus.NOT_OK,
                    null
                );
            }
        } catch (error) {
            return ResultFunction(
                false,
                'something went wrong in the server',
                422,
                ReturnStatus.NOT_OK,
                null
            );
        }
    }
}

export default PostClass