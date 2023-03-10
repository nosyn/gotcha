import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ResponseError } from '../common/errors/index.js';
import { prisma } from '../dbClient/index.js';
import { signJWT } from 'utils';

export default async function me(
  req: Request,
  res: Response
): Promise<Response> {
  const { user } = req.session;

  if (!user) {
    throw new ResponseError({
      message: ReasonPhrases.UNAUTHORIZED,
      statusCode: StatusCodes.UNAUTHORIZED,
    });
  }

  return res.status(StatusCodes.OK).send({
    user,
    jwt: signJWT(user),
  });
}

me.prototype = { handlerName: 'me' };
