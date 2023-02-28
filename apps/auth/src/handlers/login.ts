import { Request, Response } from 'express';
import { ZodError, z } from 'zod';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ErrorMessages } from '../common/enums/index.js';
import { ResponseError } from '../common/errors/index.js';

export default function login(req: Request, res: Response): Response {
  try {
    const { username, password } = loginSchema.parse(req.body);

    if (username === 'admin' && password === 'password') {
      return res.status(StatusCodes.OK).send(ReasonPhrases.OK);
    }

    throw new ResponseError({
      message: ErrorMessages.INVALID_CREDENTIALS,
      statusCode: StatusCodes.UNAUTHORIZED,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    }

    if (err instanceof ResponseError) {
      return res.status(err.statusCode).send(err.response);
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
}

const loginSchema = z.object({
  username: z.string({
    required_error: ErrorMessages.MISSING_USERNAME,
    invalid_type_error: ErrorMessages.MISSING_USERNAME,
  }),
  password: z.string({
    required_error: ErrorMessages.MISSING_PASSWORD,
    invalid_type_error: ErrorMessages.MISSING_PASSWORD,
  }),
});
