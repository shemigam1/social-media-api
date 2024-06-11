import Auth from '../classes/auth';
import PostClass from '../classes/post';

export const authFactory = () => {
	// define parameters for initialization here

	return new Auth();
};

export const postFactory = () => {
	return new PostClass()
}