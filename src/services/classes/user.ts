import { IFollower } from "../../types/post"
import User from "../../models/user"
import { ResultFunction } from "../../helpers/utils"
import { ReturnStatus } from "../../types/generic"
import Follower from "../../models/followers"
import { GetUser, IUpdateUser, UpdateUser } from "../../types/user"

class UserClass {
    public async followUser(input: IFollower) {
        let followingCount
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

                const following = (await Follower.find({ followingId }))
                followingCount = following.length
                // console.log(likeCount);
                // console.log(likes);
                // console.log(likeCount);

                const followingCountUpdate = await User.findByIdAndUpdate(userId, { followingCount }, { new: true })


                const followers = (await Follower.find({ followingId }))
                followerCount = followers.length
                // console.log(likeCount);
                // console.log(likes);
                // console.log(likeCount);

                const followerCountUpdate = await User.findByIdAndUpdate(followingId, { followerCount }, { new: true })

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


    public async getUser(input: GetUser) {

        try {
            const { userId } = input

            try {
                const existingUser = await User.findById(userId)


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
                const { password, ...data } = existingUser.toObject()

                return ResultFunction(
                    true,
                    'user returned successfully',
                    200,
                    ReturnStatus.OK,
                    data
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

    public async getAllUsers(input: GetUser) {

        // console.log(allUsers);
        console.log('i got here');

        try {
            const allUsers = await User.find({}).exec()
            if (allUsers.length === 0) {
                return ResultFunction(
                    false,
                    'there are no users',
                    404,
                    ReturnStatus.BAD_REQUEST,
                    null
                )
            }

            return ResultFunction(
                true,
                'user returned successfully',
                200,
                ReturnStatus.OK,
                allUsers
            )
        } catch (error) {
            console.log(error);

            return ResultFunction(
                false,
                'something went awfully wrong',
                422,
                ReturnStatus.NOT_OK,
                null
            );
        }
    }


    public async updateUser(input: IUpdateUser) {

        try {
            const { userId, name, email, description } = input

            try {
                const existingUser = await User.findById(userId)

                const data: UpdateUser = {
                    name, email, description
                }

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

                const updatedUser = User.findByIdAndUpdate(userId, data, { new: true })

                // const { password, ...other } = updatedUser.toObject()


                return ResultFunction(
                    true,
                    'user returned successfully',
                    200,
                    ReturnStatus.OK,
                    updatedUser
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