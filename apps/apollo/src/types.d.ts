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
};

export type User = {
  id: string;
  username: string;
  role: Role;
  online: boolean;
};

declare module 'express-session' {
  interface SessionData {
    user: User;
  }
}
