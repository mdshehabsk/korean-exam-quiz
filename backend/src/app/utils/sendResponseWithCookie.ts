import { Response } from "express";

interface IResponse {
  session_id?: undefined | string;
  user_id?: undefined | string;
  statusCode: number;
  success: boolean;
  message?: string;
}

const sendResponseWithCookie = (
  res: Response,
  data: IResponse,
  cookieKey: string
) => {
  const cookieExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  res
    .status(data.statusCode)
    .cookie(
      cookieKey,
      cookieKey === "user_id"
        ? data.user_id
        : cookieKey === "session_id"
          ? data.session_id
          : null,
      {
        expires: cookieExpires,
        // secure: true,
        sameSite: "strict",
        httpOnly:true
      }
    )
    .json({
      success: data.success,
      statusCode: data.statusCode,
      message: data.message,
      data,
    });
};

export default sendResponseWithCookie;
