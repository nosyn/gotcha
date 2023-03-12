import { pubsub, TRIGGERS_ENUM } from '../pubsub.js';
import { withFilter } from 'graphql-subscriptions';

export default {
  // More on pubsub below
  subscribe: withFilter(
    (_: any, args: any, context: any) => {
      return pubsub.asyncIterator([TRIGGERS_ENUM.ON_UPDATE_USER]);
    },
    (payload, args) => {
      return true;
    }
  ),
};
