import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// Utils
import { z } from 'zod';
import { ErrorMessages } from '../../common/enums/ErrorMessages.js';
import { verifyJWT } from 'utils';

const postVerifyJwt = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { jwt } = verifyJWTSchema.parse(req.body);

  const user = verifyJWT(jwt);

  return res.status(StatusCodes.OK).send({ user });
};

postVerifyJwt.prototype = { handlerName: 'postVerifyJwt' };

export default postVerifyJwt;

const verifyJWTSchema = z.object({
  jwt: z.string({
    required_error: ErrorMessages.MISSING_ACCESS_TOKEN,
    invalid_type_error: ErrorMessages.MISSING_ACCESS_TOKEN,
  }),
});
