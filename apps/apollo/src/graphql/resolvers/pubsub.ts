import { RedisPubSub } from 'graphql-redis-subscriptions';
import { redisOptions } from 'cache';

export const pubsub = new RedisPubSub({
  connection: redisOptions,
});

export enum TRIGGERS_ENUM {
  ON_CREATE_CAPTCHA = 'ON_CREATE_CAPTCHA',
  ON_ASSIGN_CAPTCHA = 'ON_ASSIGN_CAPTCHA',
  ON_UPSERT_CAPTCHA = 'ON_UPSERT_CAPTCHA',
  ON_UPDATE_USER = 'ON_UPDATE_USER',
}
