import { generateSalt, hashPassword } from 'utils';
import { PrismaClient } from '@prisma/client';
import { users } from './mocks/users.js';

const prisma = new PrismaClient();

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
    //@ts-ignore
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
