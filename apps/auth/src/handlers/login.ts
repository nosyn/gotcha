import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { hashPassword, signJWT } from 'utils';
import { z } from 'zod';
import { ErrorMessages } from '../common/enums/index.js';
import { ResponseError } from '../common/errors/index.js';
import { prisma } from '../dbClient/index.js';

export default async function login(
  req: Request,
  res: Response
): Promise<Response> {
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
    user: {
      id: user.id,
      username: user.username,
    },
    jwt: signJWT(user),
  });
}

login.prototype = { handlerName: 'login' };

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
