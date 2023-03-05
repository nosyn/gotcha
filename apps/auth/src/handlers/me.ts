import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ResponseError } from '../common/errors/index.js';
import { prisma } from '../dbClient/index.js';

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
  });

  if (!user) {
    throw new Error('Could not find user from session');
  }

  return res.status(StatusCodes.OK).send({
    user: {
      id: user.id,
      username: user.username,
    },
  });
}
