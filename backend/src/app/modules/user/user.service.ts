/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { CategoryModel } from "../category/category.model";
import { uploadFile } from "../uploadFile/awsUpload";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { Express } from "express";
import { OrderModel } from "../order/order.model";
import { Types } from "mongoose";

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
	const profileImgUpload = await uploadFile(profileImg, "user");
	const user = await User.create({
		...body,
		profileImg: profileImgUpload.Location,
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

const getOrderedItems = async (userId: Types.ObjectId) => {
	const isUserExist = await User.findById(userId);

	if (!isUserExist) {
		throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
	}

	const orderedItems = await OrderModel.find({ user: userId }).populate(
		"product"
	);

	return orderedItems;
};

const getCategory = async () => {
	const result = await CategoryModel.find();

	return result;
};

export const UserServices = {
	createUser,
	getUser,
	getCategory,
	getOrderedItems,
};
