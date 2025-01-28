import { Response } from "express";

interface IResponse<T> {
  statusCode: number | string;
  success: boolean;
  message?: string;
  data?: T;
  error?: T;
  token?: string
}

const sendResponse = <T>(res: Response, data: IResponse<T>) => {


  const response : Record <string , unknown> = {
    success: data.success,
    statusCode: Number(data.statusCode),
    message: data.message,
    data: data.data,
    error: data.error,
  };
  if(data?.token){
    response.token = data.token
  }
  if(response?.statusCode && typeof response?.statusCode === 'number'){
    return res.status(response.statusCode).json(response);
  }
};

export default sendResponse;


