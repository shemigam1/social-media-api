import { Schema } from "mongoose";

export interface ILogin {
	email: string;
	password: string;
}

export type LoginData = {
	user: {
		email: string;
		name: string;
	};
	token: string;
};

export interface ISignup {
	name: string,
	email: string;
	password: string;
	description: string;
	// followerCount: number
	// followingCount: number
}

export interface ISignupSchema {
	name: string,
	email: string;
	password: string;
	description: string;
	followerCount: number
	followingCount: number
}

export type SignupData = {
	user: {
		name: string,
		email: string;
		password: string;
		description: string;
	};
	// name: string;
};

export interface IForgotPassword {
	email: string
}
