import { prisma } from '../../../prisma/index.js';

export default async (_: string, args: any) => {
  const captchas = await prisma.captcha.findMany({
    select: {
      captchaId: true,
      name: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return captchas.map((c) => ({
    ...c,
    id: c.captchaId,
  }));
};
