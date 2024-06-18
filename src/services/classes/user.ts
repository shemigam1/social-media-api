import { IFollower } from "../../types/post"
import User from "../../models/user"
import { ResultFunction } from "../../helpers/utils"
import { ReturnStatus } from "../../types/generic"
import Follower from "../../models/followers"

class UserClass {
    public async followUser(input: IFollower) {
        let followerCount
        try {
            const { userId, followingId } = input

            try {
                if (userId === followingId) {
                    return ResultFunction(
                        false,
                        'user cant follow yourself',
                        422,
                        ReturnStatus.BAD_REQUEST,
                        null
                    )
                }
                const existingUser = await User.findById(followingId)

                // console.log(input);


                if (!existingUser) {
                    return ResultFunction(
                        false,
                        'user doesnt exist',
                        404,
                        ReturnStatus.BAD_REQUEST,
                        null
                    )
                }

                const existingFollow = await Follower.findOne({ userId, followingId })

                if (existingFollow) {
                    return ResultFunction(
                        false,
                        'you follow this user already',
                        422,
                        ReturnStatus.BAD_REQUEST,
                        null
                    )
                }

                const follow = await Follower.create(input)

                const followers = (await Follower.find({ followingId }))
                followerCount = followers.length
                // console.log(likeCount);
                // console.log(likes);
                // console.log(likeCount);

                const followerCountUpdate = await User.findByIdAndUpdate(userId, { followerCount }, { new: true })

                return ResultFunction(
                    true,
                    'user followed successfully',
                    200,
                    ReturnStatus.OK,
                    followerCountUpdate
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

export default UserClass