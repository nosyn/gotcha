import { Request, Response } from 'express';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

export default async function login(
  req: Request,
  res: Response
): Promise<Response> {
  return res.status(StatusCodes.OK).json({ message: 'KO' });
}
