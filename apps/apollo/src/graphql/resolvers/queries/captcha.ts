import { prisma } from '../../../prisma/index.js';

export default async (_: string, args: any) => {
  const id = args.id as string;

  const captchaCreated = await prisma.captcha.findUnique({
    where: {
      captchaId: id,
    },
    select: {
      captchaId: true,
      name: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!captchaCreated) {
    return null;
  }

  return captchaCreated;
};
