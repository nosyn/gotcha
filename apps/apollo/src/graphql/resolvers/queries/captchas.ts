import { prisma } from '../../../prisma/index.js';

export default async (_: string, args: any) => {
  const captchas = await prisma.captcha.findMany({
    select: {
      id: true,
      captchaId: true,
      name: true,
      text: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return captchas;
};
