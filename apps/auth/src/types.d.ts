import { UserStatus } from 'database';
import { Session } from 'express-session';

export type User = {
  id: number;
  username: string;
  role: Role;
  status: UserStatus;
};

declare module 'express-session' {
  interface SessionData {
    user: User;
  }
}
