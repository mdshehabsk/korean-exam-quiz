"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = (err) => {
    const errorMessage = err.value + ' is not a valid ID!';
    const statusCode = 400;
    return {
        statusCode,
        message: 'Cast Error Invalid ID',
        errorMessage,
    };
};
exports.handleCastError = handleCastError;
