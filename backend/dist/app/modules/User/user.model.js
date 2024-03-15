"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    // verificationID: { type: String },
    role: { type: String, enum: ["Admin", "User"], default: "User" },
    status: {
        type: String,
        enum: ["Active", "Pending"],
        default: "Active",
    },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
// Custom static methods:
UserSchema.statics.userExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield exports.User.findOne({ email: email }).select("+password");
    return existingUser;
});
// check if password matches:
UserSchema.statics.isPasswordMatch = (plainPass, hashedPass) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(plainPass, hashedPass);
});
// mongoose document middleware:
// Pre save middleware: will work on create() and save()
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        if (user.password) {
            // Only hash the password if it's defined
            user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_round));
        }
        next();
    });
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
UserSchema.statics.isPasswordMatch = (plainPass, hashedPass) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(plainPass, hashedPass);
});
// Post save middleware: will work on create() and save()
UserSchema.post("save", function (doc, next) {
    // console.log(this, 'Post Hook: will execute after saving data');
    doc.password = "";
    next();
});
// check if the token is generated before password changed.
UserSchema.statics.JwtIssueBeforePassChange = function (passwordChangedTimeStamp, jwtIssueTimeStamp) {
    const passwordChangeTime = new Date(passwordChangedTimeStamp).getTime() / 1000;
    return passwordChangeTime > jwtIssueTimeStamp;
};
// create model:
exports.User = (0, mongoose_1.model)("User", UserSchema);
