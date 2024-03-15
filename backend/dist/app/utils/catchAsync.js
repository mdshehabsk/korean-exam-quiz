"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (asyncFunction) => {
    return (req, res, next) => {
        Promise.resolve(asyncFunction(req, res, next)).catch((err) => next(err));
    };
};
exports.default = catchAsync;
