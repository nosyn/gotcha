import { Redis as IORedis } from 'ioredis';
export * from 'ioredis';

export const redisClient = new IORedis({
  host: process.env.REDIS_HOST || 'localhost',
  port: 6379,
  password: process.env.REDIS_PASSWORD || 'redispassword',
});
