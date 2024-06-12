import { DeletePost, PostData, UpdatePost } from "../../types/post";
import Post from "../../models/post";
import { ResultFunction } from "../../helpers/utils";
import { ReturnStatus } from "../../types/generic";
import { log } from "winston";
import { Schema } from "mongoose";

class PostClass {

    public async createPost(input: PostData) {
        try {
            const { userId, title, description } = input

            const data: PostData = {
                userId, title, description
            }
            try {
                console.log('before create post');

                const newPost = await Post.create(data)

                console.log('after create post');

                // console.log(newPost);

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
                const post = await Post.findById(userId)
                console.log(post);

                return ResultFunction(
                    true,
                    'post returned successful',
                    200,
                    ReturnStatus.OK,
                    post
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

    public async updatePost(input: UpdatePost) {
        try {
            const { userId, data } = input
            // userid is placeholder for postid

            try {
                const existingPost = Post.findById({ userId })

                if (!existingPost) {
                    return ResultFunction(
                        false,
                        'post doesnt exist',
                        404,
                        ReturnStatus.BAD_REQUEST,
                        null
                    )
                }
            } catch (error) {
                return ResultFunction(
                    false,
                    'something went wrong',
                    422,
                    ReturnStatus.NOT_OK,
                    null
                );
            }

            const updatedPost = await Post.findByIdAndUpdate(userId, data)

            return ResultFunction(
                true,
                'post updated successful',
                200,
                ReturnStatus.OK,
                updatedPost
            )
        } catch (error) {
            console.log(error);

            return ResultFunction(
                false,
                'something went wrong',
                422,
                ReturnStatus.NOT_OK,
                null
            );
        }
    }

    public async deletePost(input: DeletePost) {

        try {
            const { userId, data } = input
            console.log(data);

            try {
                const existingPost = Post.findById({ userId })

                if (!existingPost) {
                    return ResultFunction(
                        false,
                        'post doesnt exist',
                        404,
                        ReturnStatus.BAD_REQUEST,
                        null
                    )
                }
            } catch (error) {
                return ResultFunction(
                    false,
                    'something went wrong',
                    422,
                    ReturnStatus.NOT_OK,
                    null
                );
            }

            const deletedPost = await Post.findByIdAndUpdate(userId, data)

            return ResultFunction(
                true,
                'post deleted successful',
                200,
                ReturnStatus.OK,
                null
            )
        } catch (error) {
            console.log(error);

            return ResultFunction(
                false,
                'something went wrong',
                422,
                ReturnStatus.NOT_OK,
                null
            );
        }
    }
}

export default PostClass