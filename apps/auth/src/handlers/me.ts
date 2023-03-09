import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ResponseError } from '../common/errors/index.js';
import { prisma } from '../dbClient/index.js';
import { signJWT } from 'utils';

export default async function me(
  req: Request,
  res: Response
): Promise<Response> {
  const { userId } = req.session;

  if (!userId) {
    throw new ResponseError({
      message: ReasonPhrases.UNAUTHORIZED,
      statusCode: StatusCodes.UNAUTHORIZED,
    });
  }

  if (isNaN(Number(userId))) {
    throw new Error('userId from session can not be casted to number');
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
    select: {
      id: true,
      role: true,
      username: true,
    },
  });

  if (!user) {
    throw new Error('Could not find user from session');
  }

  return res.status(StatusCodes.OK).send({
    user,
    jwt: signJWT(user),
  });
}

me.prototype = { handlerName: 'me' };
