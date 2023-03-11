import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { hashPassword, signJWT } from 'utils';
import { z } from 'zod';
import { ErrorMessages } from '../common/enums/index.js';
import { ResponseError } from '../common/errors/index.js';
import { prisma } from '../dbClient/index.js';
import { User } from '../types.js';

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

  const sanitizedUser: User = {
    id: user.id,
    username: user.username,
    role: user.role,
    online: user.online,
  };

  // Set user session
  req.session.user = sanitizedUser;

  return res.status(StatusCodes.OK).send({
    user: sanitizedUser,
    jwt: signJWT(sanitizedUser),
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
