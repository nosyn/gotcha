import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
import { users } from './mocks/users';

const prisma = new PrismaClient();

const SIZE = 16;
const ITERATIONS = 1000;
const KEY_LENGTH = 64;

// Creating a unique salt for a particular user
const generateSalt = (): string => crypto.randomBytes(SIZE).toString('hex');

// Hashing user's salt and password with 1000 iterations,
const hashPassword = (password: string, salt: string): string => {
  return crypto
    .pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, `sha512`)
    .toString(`hex`);
};

const seedingUsers = async () => {
  await prisma.user.deleteMany({});

  console.log(`Seeding users`);
  for (const user of users) {
    // Creating a unique salt for a particular user
    const salt = generateSalt();

    // Hashing user's salt and password with 1000 iterations,
    const hashedPassword = hashPassword(user.password, salt);

    await prisma.user.create({
      data: {
        id: user.id,
        username: user.username,
        hash: hashedPassword,
        salt,
      },
    });
    console.log(`Created user ${user.username} with id: ${user.id}`);
  }
};

async function main() {
  console.log(`Start seeding ...`);

  // Seeding Users
  await seedingUsers();

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
