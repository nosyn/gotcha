import { PrismaClient } from 'database';

export const prisma = new PrismaClient();

console.log('prisma: ', prisma);
