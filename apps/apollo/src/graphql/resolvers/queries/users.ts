import { prisma } from '../../../prisma/index.js';

export default async (_: string, args: any, context: any) => {
  const users = await prisma.user.findMany({
    orderBy: {
      id: 'asc',
    },
    distinct: 'id',
    select: {
      id: true,
      username: true,
      status: true,
      role: true,
    },
  });

  return users;
};
