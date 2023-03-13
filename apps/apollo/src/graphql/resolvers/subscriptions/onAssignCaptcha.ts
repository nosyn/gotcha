import { withFilter } from 'graphql-subscriptions';
import { pubsub, TRIGGERS_ENUM } from '../pubsub.js';

export default {
  // More on pubsub below
  subscribe: withFilter(
    () => {
      return pubsub.asyncIterator([TRIGGERS_ENUM.ON_ASSIGN_CAPTCHA]);
    },
    async (payload, args) => +args.input.userId === payload?.userId
  ),
};
