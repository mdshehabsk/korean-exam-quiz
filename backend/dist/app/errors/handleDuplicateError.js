"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = void 0;
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extracted_message = match && match[1];
    const errorDetails = [
        {
            path: err.keyValue,
            message: `${extracted_message} already exists`,
        },
    ];
    const errorMessage = [`${extracted_message} already exists`].join('');
    const statusCode = 400;
    return {
        statusCode,
        message: 'Duplicate Error',
        errorMessage,
        errorDetails,
    };
};
exports.handleDuplicateError = handleDuplicateError;
