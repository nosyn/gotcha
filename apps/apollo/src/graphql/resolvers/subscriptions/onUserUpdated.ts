import { pubsub, TRIGGERS_ENUM } from '../pubsub.js';
import { withFilter } from 'graphql-subscriptions';

export default {
  // More on pubsub below
  subscribe: withFilter(
    (_: any, args: any, context: any) => {
      console.log('args: ', args?.input);
      return pubsub.asyncIterator([TRIGGERS_ENUM.ON_USER_UPDATED]);
    },
    (payload, args) => {
      console.log('payloadddd: ', payload);
      // return payload.user.id === args.userId;
      return true;
    }
  ),
};