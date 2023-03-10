import { Session } from 'express-session';

export type User = {
  id: number;
  username: string;
  role: Role;
  online: boolean;
};

declare module 'express-session' {
  interface SessionData {
    user: User;
  }
}
