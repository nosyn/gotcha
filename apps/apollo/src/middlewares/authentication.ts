import session from 'express-session';
import { redisSessionStore } from 'cache';

import { COOKIES_NAME } from '../configs.js';

export default session({
  name: COOKIES_NAME,
  store: redisSessionStore as any,
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
