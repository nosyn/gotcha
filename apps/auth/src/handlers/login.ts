import { Request, Response } from 'express';
import { ZodError, z } from 'zod';
import { hashPassword } from 'utils';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ErrorMessages } from '../common/enums/index.js';
import { ResponseError } from '../common/errors/index.js';
import { prisma } from '../dbClient/index.js';

export default async function login(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { username, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user || user.hash !== hashPassword(password, user.salt)) {
      throw new ResponseError({
        message: ErrorMessages.INVALID_CREDENTIALS,
        statusCode: StatusCodes.UNAUTHORIZED,
      });
    }

    // Set user session
    req.session.userId = user.id.toString();

    return res.status(StatusCodes.OK).send({
      payload: {
        user: {
          id: user.id,
          username: user.username,
        },
      },
      errors: [],
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

    console.error('Unhandled error: ', err);
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
