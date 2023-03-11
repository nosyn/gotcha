import { withFilter } from 'graphql-subscriptions';
import { pubsub, TRIGGERS_ENUM } from '../pubsub.js';
import { prisma } from '../../../prisma/index.js';

export default {
  // More on pubsub below
  subscribe: withFilter(
    () => {
      return pubsub.asyncIterator([TRIGGERS_ENUM.CAPTCHA_ASSIGNED]);
    },
    async (payload, args) => {
      const firstUser = await prisma.user.findFirst({
        where: {
          online: true,
          role: 'USER',
        },
      });

      console.log('firstUser: ', firstUser);
      console.log('args: ', args);
      return +args.userId === firstUser?.id;
    }
  ),
};
