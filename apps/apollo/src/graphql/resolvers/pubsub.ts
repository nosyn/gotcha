import { RedisPubSub } from 'graphql-redis-subscriptions';
import { redisOptions } from 'cache';

export const pubsub = new RedisPubSub({
  connection: redisOptions,
});

export enum TRIGGERS_ENUM {
  CAPTCHA_CREATED = 'CAPTCHA_CREATED',
  CAPTCHA_ASSIGNED = 'CAPTCHA_ASSIGNED',
  ON_USER_UPDATED = 'ON_USER_UPDATED',
}
