import { Role } from '@prisma/client';

export type User = {
  id: number;
  username: string;
  role: Role;
  password: string;
};

export const users: User[] = [
  {
    id: 1,
    username: 'admin',
    role: 'ADMIN',
    password: 'password',
  },
  {
    id: 2,
    username: 'user',
    role: 'USER',
    password: 'password',
  },
  {
    id: 3,
    username: 'user_2',
    role: 'USER',
    password: 'password',
  },
  {
    id: 4,
    username: 'user_3',
    role: 'USER',
    password: 'password',
  },
];
