import { prisma } from '../../../prisma/index.js';
import { captchaQueue } from '../../../services/queue/index.js';
import { CaptchaInput } from '../../../types.js';
import { pubsub, TRIGGERS_ENUM } from '../pubsub.js';

export default async (_: any, args: any) => {
  const input = args.input as CaptchaInput;

  const createdCaptcha = await prisma.captcha.create({
    data: {
      ...input,
      answer: '',
    },
    select: {
      id: true,
      name: true,
      captchaId: true,
      answer: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  await captchaQueue.add(createdCaptcha.captchaId, { captcha: createdCaptcha });

  console.log(`Added captcha ${createdCaptcha.captchaId} into the queue`);

  return createdCaptcha;
};
