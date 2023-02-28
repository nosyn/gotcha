import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

export enum TRIGGERS_ENUM {
  CAPTCHA_CREATED = 'CAPTCHA_CREATED',
}
export const TRIGGERS_MAP = new Map();
TRIGGERS_MAP.set('CAPTCHA_CREATED', 'CAPTCHA_CREATED');
