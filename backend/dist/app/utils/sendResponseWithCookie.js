"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponseWithCookie = (res, data, cookieKey) => {
    const cookieExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    res
        .status(data.statusCode)
        .cookie(cookieKey, cookieKey === "user_id"
        ? data.user_id
        : cookieKey === "session_id"
            ? data.session_id
            : null, {
        expires: cookieExpires,
        // secure: true,
        sameSite: "strict",
        httpOnly: true
    })
        .json({
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        data,
    });
};
exports.default = sendResponseWithCookie;
