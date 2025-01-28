import { NextFunction, Request, Response } from "express";
import {  z, ZodTypeAny } from "zod";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";

export const validateBodyRequest = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {

    try {
     await schema.parseAsync({
        body: req.body,
      });

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          path: err.path[1],
          message: err.message,
        }));
        return sendResponse(res, {
          statusCode: httpStatus.BAD_REQUEST,
          success: false,
          error: formattedErrors,
          message: "validation faild",
          data: null,
        });
      }
      next(error);
    }
  };
};


export const validateFilesRequest = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // data validation check
    try {
     await schema.parseAsync({
        body: req.body,
        files: req.files
      });
      
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.map((err) => {
          return ({
            path: err.path[1],
            message: err.message,
          })
        });
        return sendResponse(res, {
          statusCode: httpStatus.BAD_REQUEST,
          success: false,
          error: formattedErrors,
          message: "validation faild",
          data: null,
        });
      }
      next(error);
    }
  };
};
