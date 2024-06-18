import Auth from '../classes/auth';
import PostClass from '../classes/post';
import UserClass from '../classes/user';

export const authFactory = () => {
	// define parameters for initialization here

	return new Auth();
};

export const postFactory = () => {
	return new PostClass()
}

export const userFactory = () => {
	return new UserClass()
}