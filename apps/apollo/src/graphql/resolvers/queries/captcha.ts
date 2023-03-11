import { Redis, redisOptions } from 'cache';
import { prisma } from '../../../prisma/index.js';
import { captchaQueue } from '../../../services/queue/index.js';
import { Worker } from 'bullmq';

export default async (_: string, args: any) => {
  const captchaId = args.captchaId as string;

  console.log('captchaId: ', captchaId);
  const captchaCreated = await prisma.captcha.findUniqueOrThrow({
    where: {
      captchaId,
    },
  });

  return captchaCreated;
};
