import session from 'express-session';
import RedisStore from 'connect-redis';

// Constants
import { COOKIES_NAME } from '../../constants.js';

// Services
import redisClient from 'cache';

const authenticationMiddleware = () => {
  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'auth:',
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
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
      httpOnly: true, // cookie won't be accessible by Javascript on the front end
      // secure: true, // cookie only works in https, if you're using http for dev. This line should be disable
      sameSite: 'lax', // csrf
    },
  });
};

export { authenticationMiddleware };
