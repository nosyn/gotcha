import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

// Utils
import { z } from 'zod';
import { ErrorMessages } from '../../common/enums/ErrorMessages.js';
import { verifyJWT as verifyJWTUtil } from 'utils';

const verifyJWT = async (req: Request, res: Response) => {
  const { accessToken } = verifyJWTSchema.parse(req.body);

  const payload = verifyJWTUtil(accessToken);

  console.log('payload: ', payload);

  //   throw new ResponseError({
  //     statusCode: StatusCodes.UNAUTHORIZED,
  //     message: ReasonPhrases.UNAUTHORIZED,
  //   });

  res.status(StatusCodes.OK).send({ message: ReasonPhrases.OK });
};

verifyJWT.prototype = { handlerName: 'verifyJWT' };

export default verifyJWT;

const verifyJWTSchema = z.object({
  accessToken: z.string({
    required_error: ErrorMessages.MISSING_ACCESS_TOKEN,
    invalid_type_error: ErrorMessages.MISSING_ACCESS_TOKEN,
  }),
});
