import { hashPassword, generateSession } from 'utils';
import { prisma } from '../../../prisma/index.js';

export default async (_: any, args: any, ctx: any) => {
  const { username, password } = args.input;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user || user.hash !== hashPassword(password, user.salt)) {
    throw new Error('Unauthorized');
  }

  // Set user session
  ctx.req.session.user = user;

  const sanitizedUser = {
    id: user.id,
    username: user.username,
    role: user.role,
    status: user.status,
  };

  return {
    me: sanitizedUser,
    session: generateSession(sanitizedUser),
  };
};
