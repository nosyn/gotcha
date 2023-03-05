import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

// Utils
import { z } from 'zod';
import { ErrorMessages } from '../../common/enums/ErrorMessages.js';
import { verifyJWT } from 'utils';

const postVerifyJwt = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { jwt } = verifyJWTSchema.parse(req.body);

  console.log('jwt: ', jwt);

  const payload = verifyJWT(jwt);

  console.log('payload: ', payload);

  //   throw new ResponseError({
  //     statusCode: StatusCodes.UNAUTHORIZED,
  //     message: ReasonPhrases.UNAUTHORIZED,
  //   });

  return res.status(StatusCodes.OK).send({ message: ReasonPhrases.OK });
};

postVerifyJwt.prototype = { handlerName: 'postVerifyJwt' };

export default postVerifyJwt;

const verifyJWTSchema = z.object({
  jwt: z.string({
    required_error: ErrorMessages.MISSING_ACCESS_TOKEN,
    invalid_type_error: ErrorMessages.MISSING_ACCESS_TOKEN,
  }),
});
