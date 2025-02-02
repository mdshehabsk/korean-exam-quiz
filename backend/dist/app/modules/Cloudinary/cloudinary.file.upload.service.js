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
exports.cloudinaryFileUpload = void 0;
const config_1 = __importDefault(require("./config"));
const uuid_1 = require("uuid");
const cloudinaryFileUpload = (files_1, ...args_1) => __awaiter(void 0, [files_1, ...args_1], void 0, function* (files, folder = 'korean') {
    try {
        const uploadPromises = files.map((file) => new Promise((resolve, reject) => {
            const originalName = file.originalname.split(' ').join('-');
            const extension = file.originalname.split('.').pop();
            const uniqueName = `${originalName}_${(0, uuid_1.v4)()}.${extension}`;
            const uploadStream = config_1.default.uploader.upload_stream({ folder, public_id: uniqueName, resource_type: 'auto' }, (error, result) => {
                if (error) {
                    // eslint-disable-next-line no-console
                    console.log('error happedn during file upload', error);
                    reject(error);
                }
                else if (result) {
                    resolve(result);
                }
            });
            uploadStream.end(file.buffer);
        }));
        const results = yield Promise.all(uploadPromises);
        return results;
    }
    catch (error) {
        throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
});
exports.cloudinaryFileUpload = cloudinaryFileUpload;
