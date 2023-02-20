import { getReasonPhrase, StatusCodes } from 'http-status-codes';

type ErrorResponse = {
  message: string;
  error: string;
  statusCode: number;
};

type ErrorResponseInput = {
  message: string;
  statusCode: number;
};

export const generateErrorResponse = ({
  message,
  statusCode,
}: ErrorResponseInput): ErrorResponse => {
  return {
    message,
    error: getReasonPhrase(statusCode),
    statusCode,
  };
};
