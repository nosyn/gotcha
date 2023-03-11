import { Role, UserStatus } from '@prisma/client';

export type MockUsersList = {
  id: number;
  username: string;
  role: Role;
  status: UserStatus;
  password: string;
};

export const users: MockUsersList[] = [
  {
    id: 1,
    username: 'admin',
    role: 'ADMIN',
    status: 'OFFLINE',
    password: 'password',
  },
  {
    id: 2,
    username: 'user',
    role: 'USER',
    status: 'OFFLINE',
    password: 'password',
  },
  {
    id: 3,
    username: 'user_2',
    role: 'USER',
    status: 'OFFLINE',
    password: 'password',
  },
  {
    id: 4,
    username: 'user_3',
    role: 'USER',
    status: 'OFFLINE',
    password: 'password',
  },
];
