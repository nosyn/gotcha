import { RedisPubSub } from 'graphql-redis-subscriptions';
import { redisOptions } from 'cache';

export const pubsub = new RedisPubSub({
  connection: redisOptions,
});

export enum TRIGGERS_ENUM {
  CAPTCHA_CREATED = 'CAPTCHA_CREATED',
}
export const TRIGGERS_MAP = new Map();
TRIGGERS_MAP.set('CAPTCHA_CREATED', 'CAPTCHA_CREATED');
