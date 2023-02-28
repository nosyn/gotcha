import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export default async function health(
  _req: Request,
  res: Response
): Promise<Response> {
  return res
    .status(StatusCodes.OK)
    .json({
      message: `GraphQL Server is up and health at ${new Date().toISOString()}`,
    });
}
