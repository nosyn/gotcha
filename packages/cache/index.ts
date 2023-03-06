import { Redis as IORedis, RedisOptions } from 'ioredis';
export * from 'ioredis';

export const redisOptions: RedisOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: 6379,
  password: process.env.REDIS_PASSWORD || 'redispassword',
};

export const redisClient = new IORedis(redisOptions);
