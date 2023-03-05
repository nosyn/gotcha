import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { COOKIES_NAME } from '../configs.js';

export default async function login(
  req: Request,
  res: Response
): Promise<Response> {
  return new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) {
        reject(new Error('Can not destroy session'));
      }
    });

    res.clearCookie(COOKIES_NAME);
    resolve(res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK }));
  });
}
