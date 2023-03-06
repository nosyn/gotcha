import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';
import {
  ResponseError,
  internalServerError,
} from '../../common/errors/index.js';
import { JsonWebTokenError, TokenExpiredError } from 'utils';
import { ErrorMessages } from '../../common/enums/ErrorMessages.js';

export type HandlerFunc = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response>;

export const handlerFuncWrapper =
  (handler: HandlerFunc) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      // Access token expired
      if (
        error instanceof TokenExpiredError ||
        error instanceof JsonWebTokenError
      ) {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .send({ message: ErrorMessages.INVALID_ACCESS_TOKEN });
        return;
      }

      if (error instanceof ZodError) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ message: error.message });
      }

      if (error instanceof ResponseError) {
        return res.status(error.statusCode).send(error.response);
      }

      const handlerName = handler.prototype?.handlerName || 'undefined handler';
      console.error(`Unhandled error at ${handlerName}:\n${error}`);

      return res
        .status(internalServerError.statusCode)
        .send(internalServerError.response);
    }
  };
