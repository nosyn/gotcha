import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { ResponseError, internalServerError } from '../common/errors/index.js';

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
    } catch (err) {
      if (err instanceof ZodError) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ message: err.message });
      }

      if (err instanceof ResponseError) {
        return res.status(err.statusCode).send(err.response);
      }

      const handlerName = handler.prototype?.handlerName || 'undefined handler';
      console.error(`Unhandled error at ${handlerName}:\n${err}`);

      return res
        .status(internalServerError.statusCode)
        .send(internalServerError.response);
    }
  };
