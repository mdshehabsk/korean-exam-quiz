/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";
import { AppError } from "../errors/AppError";
import { handleCastError } from "../errors/handleCastError";
import { handleDuplicateError } from "../errors/handleDuplicateError";
import { handleValidationError } from "../errors/handleValidationError";
import { handleZodError } from "../errors/handleZodError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values
  let statusCode = 500;
  let message = "Something went wrong";

  let errorDetails;
  let errorMessage = "Something went wrong";

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
    errorDetails = err;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
    errorDetails = err;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
    errorDetails = err;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
    errorDetails = err;
  }
  // else if (err?.statusCode === 400) {
  //   statusCode = 409;
  //   message = 'Duplicate error';
  //   errorMessage = 'Title already in use';
  //   errorDetails = [{ path: 'title', message: 'already in use' }];
  // }
  else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = "App Error";
    errorMessage = err?.message;
    errorDetails = err;
  } else if (err instanceof Error) {
    message = "An error occurred";
    errorMessage = err?.message;
    errorDetails = err;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,

    stack: config.node_env === "production" ? err?.stack : null,
  });
};

export default globalErrorHandler;
