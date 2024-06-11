import { PostData } from "../../types/post";
import Post from "../../models/post";
import { ResultFunction } from "../../helpers/utils";
import { ReturnStatus } from "../../types/generic";

class PostClass {

    public async createPost(input: PostData) {
        try {
            const { userId, title, description } = input

            const data: PostData = {
                userId, title, description
            }

            try {
                const newPost = await Post.create(data)
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
}

export default PostClass