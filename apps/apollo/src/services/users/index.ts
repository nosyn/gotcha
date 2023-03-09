import { prisma } from '../../prisma/index.js';

export const userOnline = async ({ userId }: { userId: string }) => {
  await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      online: true,
    },
  });
};

export const userOffline = async ({ userId }: { userId: string }) => {
  await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      online: false,
    },
  });
};
