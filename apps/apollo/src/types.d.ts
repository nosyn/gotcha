import { Role, UserStatus } from 'database';
import { Session } from 'express-session';

export type CaptchaStatus = 'CREATED' | 'RESOLVING' | 'RESOLVED';

export type Captcha = {
  id: string;
  captchaId: string;
  name: string;
  status: CaptchaStatus;
  createdAt: string;
  updatedAt: string;
};

export type CaptchaInput = {
  captchaId: string;
  name: string;
  status: CaptchaStatus;
  text: string;
};

export type User = {
  id: string;
  username: string;
  role: Role;
  status: UserStatus;
};

declare module 'express-session' {
  interface SessionData {
    user: User;
  }
}
