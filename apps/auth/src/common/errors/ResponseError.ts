import { StatusCodes } from 'http-status-codes';
import { ErrorMessages } from '../enums/index.js';

interface IResponseErrorCtor {
  statusCode: StatusCodes;
  message: ErrorMessages;
}

interface IResponseError {
  error: IError;
}

interface IError {
  message: string;
}

export class ResponseError extends Error {
  public statusCode: number;

  constructor({ message, statusCode }: IResponseErrorCtor) {
    super(message);
    this.statusCode = statusCode;

    // Set the prototype explicitly
    Object.setPrototypeOf(this, ResponseError.prototype);
  }

  get response(): IResponseError {
    return {
      error: { message: this.message },
    };
  }
}
