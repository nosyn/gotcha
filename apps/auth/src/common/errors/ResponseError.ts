import { StatusCodes } from 'http-status-codes';
import { DatabaseErrorMessages, ErrorMessages } from '../enums';

interface IResponseErrorCtor {
  statusCode: StatusCodes;
  message: ErrorMessages | DatabaseErrorMessages;
}

interface IResponseError {
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
      message: this.message,
    };
  }
}
