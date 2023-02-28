import { Request, Response } from 'express';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

export default async function login(
  req: Request,
  res: Response
): Promise<Response> {
  const { username, email } = await loginSchema.parseAsync(req.body);

  if (username === 'username' && email === 'password') {
    return res.status(StatusCodes.OK).json({ message: 'OK' });
  }

  return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'KO' });
}

const loginSchema = z.object({
  username: z.string({
    required_error: 'Username is required',
  }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Not a valid email',
    }),
});
