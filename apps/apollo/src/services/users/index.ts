import { prisma } from '../../prisma/index.js';
import { redisClient } from 'cache';

const PREFIX_KEY = 'online-user:';

export const userOnline = async ({ userId }: { userId: string }) => {
  // redisClient.lpush(PREFIX_KEY, userId);

  const user = await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      online: true,
    },
  });

  // console.log('online user: ', user);
  await redisClient.hmset(PREFIX_KEY + userId, user);
};

export const userOffline = async ({ userId }: { userId: string }) => {
  const user = await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      online: false,
    },
  });

  // console.log('offline user: ', user);

  await redisClient.hmset(PREFIX_KEY + userId, user);
};
