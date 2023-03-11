import { withFilter } from 'graphql-subscriptions';
import { pubsub, TRIGGERS_ENUM } from '../pubsub.js';

export default {
  // More on pubsub below
  subscribe: withFilter(
    () => {
      return pubsub.asyncIterator([TRIGGERS_ENUM.CAPTCHA_ASSIGNED]);
    },
    async (payload, args) => {
      console.log('payload: ', payload);
      console.log('args: ', args);
      return +args.userId === payload?.userId;
    }
  ),
};
