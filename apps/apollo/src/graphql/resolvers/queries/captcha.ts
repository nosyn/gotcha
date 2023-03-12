import { prisma } from '../../../prisma/index.js';

export default async (_: string, args: any) => {
  const captchaId = args.captchaId as string;

  const createdCaptcha = await prisma.captcha.findUniqueOrThrow({
    where: {
      captchaId,
    },
  });

  return createdCaptcha;
};
