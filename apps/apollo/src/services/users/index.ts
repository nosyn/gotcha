import { pubsub, TRIGGERS_ENUM } from '../../graphql/resolvers/pubsub.js';
import { prisma } from '../../prisma/index.js';
import { redisClient } from 'cache';

const PREFIX_KEY = 'online-user:';

export const userOnline = async ({ userId }: { userId: string }) => {
  const user = await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      online: true,
    },
    select: {
      id: true,
      username: true,
      role: true,
      online: true,
    },
  });

  await pubsub.publish(TRIGGERS_ENUM.ON_USER_UPDATED, { onUserUpdated: user });
};

export const userOffline = async ({ userId }: { userId: string }) => {
  const user = await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      online: false,
    },
    select: {
      id: true,
      username: true,
      role: true,
      online: true,
    },
  });

  // console.log('offline user: ', user);
  await pubsub.publish(TRIGGERS_ENUM.ON_USER_UPDATED, { onUserUpdated: user });
};
