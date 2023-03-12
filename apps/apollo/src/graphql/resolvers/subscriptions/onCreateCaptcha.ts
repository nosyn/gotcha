import { pubsub, TRIGGERS_ENUM } from '../pubsub.js';

export default {
  // More on pubsub below
  subscribe: (_: any, args: any, context: any) => {
    return pubsub.asyncIterator([TRIGGERS_ENUM.ON_CAPTCHA_CREATED]);
  },
};
