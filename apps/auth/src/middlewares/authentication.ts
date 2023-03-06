import session from 'express-session';
import RedisStore from 'connect-redis';
import { redisClient } from 'cache';

import { COOKIES_NAME } from '../configs.js';

export const authentication = () => {
  const redisStore = new RedisStore({
    client: redisClient,
    // prefix: 'auth:',
    disableTTL: true,
  });

  return session({
    name: COOKIES_NAME,
    store: redisStore as any,
    saveUninitialized: false,
    // TODO: Using environment variable
    secret: 'keyboard cat',
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true, // cookie won't be accessible by Javascript on the front end
      // secure: true, // cookie only works in https, if you're using http for dev. This line should be disable
      sameSite: 'lax', // csrf
    },
  });
};
