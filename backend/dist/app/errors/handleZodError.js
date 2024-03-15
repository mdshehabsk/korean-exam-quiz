"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (err) => {
    const errorMessage = err.issues
        .map((issue) => {
        return (issue === null || issue === void 0 ? void 0 : issue.path[(issue === null || issue === void 0 ? void 0 : issue.path.length) - 1]) + ' is ' + issue.message;
    })
        .join(', ');
    const statusCode = 400;
    return {
        statusCode,
        message: 'Zod Validation failure',
        errorMessage,
    };
};
exports.handleZodError = handleZodError;
