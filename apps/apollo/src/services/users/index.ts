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

  await pubsub.publish(TRIGGERS_ENUM.ON_UPDATE_USER, { onUpdateUser: user });
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

  await pubsub.publish(TRIGGERS_ENUM.ON_UPDATE_USER, { onUpdateUser: user });
};
