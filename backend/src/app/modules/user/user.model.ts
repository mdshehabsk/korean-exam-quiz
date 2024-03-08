import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
// import { AppError } from "../../errors/AppError";
import { IUser, UserModel } from "./user.interface";

const UserSchema = new Schema<IUser, UserModel>(
  {
    firstName: { type: String },
    lastName: { type: String },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    phone: { type: String, required: true },
    profileImg: { type: String, required: true },
    // verificationID: { type: String },
    role: { type: String, enum: ["Admin", "Vendor", "User"], default: "User" },
    status: {
      type: String,
      enum: ["Active", "Pending"],
      default: "Active",
    },
    isDeleted: { type: Boolean, default: false },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      // unique:true
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "cart",
    },
    buyedProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: "order",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Custom static methods:
UserSchema.statics.userExists = async (email: string) => {
  const existingUser = await User.findOne({ email: email }).select("+password");
  return existingUser;
};

// check if password matches:
UserSchema.statics.isPasswordMatch = async (plainPass, hashedPass) => {
  return await bcrypt.compare(plainPass, hashedPass);
};

// mongoose document middleware:
// Pre save middleware: will work on create() and save()
UserSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (user.password) {
    // Only hash the password if it's defined
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_round)
    );
  }

  next();
});

// UserSchema.pre("findOneAndUpdate", async function (next) {
//   const query = this.getQuery();

//   const idExists = await User.findOne(query);

//   if (!idExists) {
//     throw new AppError(404, `User with id: '${query._id}' doesn't exists`);
//   }

//   next();
// });

// check if password matches:
UserSchema.statics.isPasswordMatch = async (plainPass, hashedPass) => {
  return await bcrypt.compare(plainPass, hashedPass);
};

// Post save middleware: will work on create() and save()
UserSchema.post("save", function (doc, next) {
  // console.log(this, 'Post Hook: will execute after saving data');
  doc.password = "";
  next();
});

// check if the token is generated before password changed.
UserSchema.statics.JwtIssueBeforePassChange = function (
  passwordChangedTimeStamp: Date,
  jwtIssueTimeStamp: number
) {
  const passwordChangeTime =
    new Date(passwordChangedTimeStamp).getTime() / 1000;

  return passwordChangeTime > jwtIssueTimeStamp;
};

// create model:
export const User = model<IUser, UserModel>("User", UserSchema);
