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
	following: Schema.Types.ObjectId[];
	followers: Schema.Types.ObjectId[];
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
