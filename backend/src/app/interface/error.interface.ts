export type IErrorDetails = {
  path: string | number;
  message: string;
}[];

export type IErrorMessage = {
  message: string;
};

export interface IGenericErrorResponse {
  statusCode: number;
  message: string;
  errorMessage: string;
  errorDetails: IErrorDetails;
}
