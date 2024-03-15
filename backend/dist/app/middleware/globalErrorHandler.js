"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const AppError_1 = require("../errors/AppError");
const handleCastError_1 = require("../errors/handleCastError");
const handleDuplicateError_1 = require("../errors/handleDuplicateError");
const handleValidationError_1 = require("../errors/handleValidationError");
const handleZodError_1 = require("../errors/handleZodError");
const globalErrorHandler = (err, req, res, next) => {
    // setting default values
    let statusCode = 500;
    let message = "Something went wrong";
    let errorDetails;
    let errorMessage = "Something went wrong";
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.handleZodError)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessage = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessage;
        errorDetails = err;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.handleValidationError)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessage = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessage;
        errorDetails = err;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const simplifiedError = (0, handleCastError_1.handleCastError)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessage = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessage;
        errorDetails = err;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.handleDuplicateError)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessage = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessage;
        errorDetails = err;
    }
    // else if (err?.statusCode === 400) {
    //   statusCode = 409;
    //   message = 'Duplicate error';
    //   errorMessage = 'Title already in use';
    //   errorDetails = [{ path: 'title', message: 'already in use' }];
    // }
    else if (err instanceof AppError_1.AppError) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = "App Error";
        errorMessage = err === null || err === void 0 ? void 0 : err.message;
        errorDetails = err;
    }
    else if (err instanceof Error) {
        message = "An error occurred";
        errorMessage = err === null || err === void 0 ? void 0 : err.message;
        errorDetails = err;
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        errorDetails,
        stack: config_1.default.node_env === "production" ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
