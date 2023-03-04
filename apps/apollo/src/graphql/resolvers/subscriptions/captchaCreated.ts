import { pubsub, TRIGGERS_ENUM } from '../pubsub.js';

export default {
  // More on pubsub below
  subscribe: () => pubsub.asyncIterator([TRIGGERS_ENUM['CAPTCHA_CREATED']]),
};
