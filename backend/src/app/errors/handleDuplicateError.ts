/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IErrorDetails,
  IGenericErrorResponse,
} from '../interface/error.interface';

export const handleDuplicateError = (err: any): IGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extracted_message = match && match[1];
  const errorDetails: IErrorDetails = [
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


