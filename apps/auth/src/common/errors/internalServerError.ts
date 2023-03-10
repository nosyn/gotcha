import { ResponseError } from './ResponseError.js';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const internalServerError = new ResponseError({
  message: ReasonPhrases.INTERNAL_SERVER_ERROR,
  statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
});
