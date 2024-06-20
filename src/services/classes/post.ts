import { CommentData, DeletePost, GetComments, IComment, ILike, LikeData, PostData, UpdatePost } from "../../types/post";
import Post from "../../models/post";
import { ResultFunction } from "../../helpers/utils";
import { ReturnStatus } from "../../types/generic";
import { log } from "winston";
import { Schema } from "mongoose";
import Like from "../../models/likes";
import Comment from "../../models/comment";

class PostClass {

    public async feed() {
        try {
            const posts = await Post.aggregate([
                { $match: { deleted: false } },
                { $sample: { size: 2 } } // return a random selection of 10 posts
            ]);

            // console.log(posts);

            return ResultFunction(
                true,
                'post returned successful',
                200,
                ReturnStatus.OK,
                posts
            );

        } catch (error) {
            return ResultFunction(
                false,
                'couldnt get posts',
                422,
                ReturnStatus.NOT_OK,
                null
            );
        }
    }

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
                posts.filter((post) => post.deleted === false)
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
                if (post?.deleted === true) {
                    return ResultFunction(
                        false,
                        'post has been deleted',
                        422,
                        ReturnStatus.BAD_REQUEST,
                        null
                    )
                }
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
            const { postId, data } = input
            // userid is placeholder for postid

            try {
                const existingPost = await Post.findById(postId)

                if (!existingPost) {
                    return ResultFunction(
                        false,
                        'post doesnt exist',
                        404,
                        ReturnStatus.BAD_REQUEST,
                        null
                    )
                }

                if (existingPost.userId.toString() === data.userId) {
                    const { userId, ...other } = data
                    const updatedPost = await Post.findByIdAndUpdate(postId, other, { new: true })
                    //const updatedPost = await Post.findByIdAndUpdate(postId, other)

                    return ResultFunction(
                        true,
                        'post updated successful',
                        200,
                        ReturnStatus.OK,
                        updatedPost
                    )
                } else {
                    return ResultFunction(
                        false,
                        'Unauthorized to update post',
                        400,
                        ReturnStatus.UNAUTHORIZED,
                        null
                    )
                }
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

            // if (existingPost.userId === userId) { }


        } catch (error) {
            console.log(error, 'this is the error');

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
                const existingPost = Post.findById(userId)

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

            const deletedPost = await Post.findByIdAndUpdate(userId, data, { new: true })

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

    public async likePost(input: ILike) {
        let likeCount
        try {
            const { userId, postId } = input

            try {
                const existingPost = await Post.findById(postId)

                // console.log(input);


                if (!existingPost) {
                    return ResultFunction(
                        false,
                        'post doesnt exist',
                        404,
                        ReturnStatus.BAD_REQUEST,
                        null
                    )
                }

                const existingLike = await Like.findOne({ userId, postId })

                if (existingLike) {
                    return ResultFunction(
                        false,
                        'post liked by user already',
                        422,
                        ReturnStatus.BAD_REQUEST,
                        null
                    )
                }

                const like = await Like.create(input)

                const likes = (await Like.find({ postId }))
                likeCount = likes.length
                // console.log(likeCount);
                // console.log(likes);
                // console.log(likeCount);

                const likeCountUpdate = await Post.findByIdAndUpdate(postId, { likeCount }, { new: true })

                return ResultFunction(
                    true,
                    'post liked',
                    200,
                    ReturnStatus.OK,
                    likeCountUpdate
                )
            } catch (error) {
                return ResultFunction(
                    false,
                    'something went wrong',
                    422,
                    ReturnStatus.NOT_OK,
                    null
                );
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
    }

    public async commentPost(input: CommentData) {
        // let likeCount
        try {
            const { userId, postId, comment } = input

            try {
                const existingPost = await Post.findById(postId)

                // console.log(input);


                if (!existingPost) {
                    return ResultFunction(
                        false,
                        'post doesnt exist',
                        404,
                        ReturnStatus.BAD_REQUEST,
                        null
                    )
                }

                const comment = await Comment.create(input)

                return ResultFunction(
                    true,
                    'comment created',
                    200,
                    ReturnStatus.OK,
                    comment
                )
            } catch (error) {
                return ResultFunction(
                    false,
                    'something went wrong',
                    422,
                    ReturnStatus.NOT_OK,
                    null
                );
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
    }


    public async getComments(input: GetComments) {
        // let likeCount
        try {
            const { postId } = input

            try {
                const existingPost = await Post.findById(postId)

                // console.log(input);


                if (!existingPost) {
                    return ResultFunction(
                        false,
                        'post doesnt exist',
                        404,
                        ReturnStatus.BAD_REQUEST,
                        null
                    )
                }

                const allComments = await Comment.find({ input })

                return ResultFunction(
                    true,
                    'comment created',
                    200,
                    ReturnStatus.OK,
                    allComments
                )
            } catch (error) {
                return ResultFunction(
                    false,
                    'something went wrong',
                    422,
                    ReturnStatus.NOT_OK,
                    null
                );
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
    }
}

export default PostClass