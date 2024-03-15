/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";


import { IUser } from "./user.interface";
import { User } from "./user.model";


const createUser = async ({
	body,
	profileImg,
}: {
	body: IUser;
	profileImg: Express.Multer.File;
}) => {
	const userExist = await User.findOne({
		$or: [{ username: body.username }, { email: body.email }],
	});
	if (userExist?.username === body.username) {
		return {
			username_exist: true,
		};
	}
	if (userExist?.email === body.email) {
		return {
			email_exist: true,
		};
	}
	const user = await User.create({
		...body,
	});
	return { user };
};

const getUser = async (userId: string) => {
	const user = await User.findById(userId)
		.select(
			"firstName lastName name  profileImg  email  role  phone cart, buyedProducts"
		)
		.populate({
			path: "cart",
			populate: { path: "products" },
		})
		.populate("buyedProducts");

	return user;
};





export const UserServices = {
	createUser,
	getUser,
};
