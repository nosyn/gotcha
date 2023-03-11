import { pubsub, TRIGGERS_ENUM } from '../../graphql/resolvers/pubsub.js';
import { prisma } from '../../prisma/index.js';

export const userOnline = async ({ userId }: { userId: string }) => {
  const user = await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      status: 'ONLINE',
    },
    select: {
      id: true,
      username: true,
      role: true,
      status: true,
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
      status: 'OFFLINE',
    },
    select: {
      id: true,
      username: true,
      role: true,
      status: true,
    },
  });

  // console.log('offline user: ', user);
  await pubsub.publish(TRIGGERS_ENUM.ON_USER_UPDATED, { onUserUpdated: user });
};
