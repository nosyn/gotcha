import { prisma } from '../../../prisma/index.js';
import { captchaQueue } from '../../../services/queue/index.js';
import { CaptchaInput } from '../../../types.js';

export default async (_: any, args: any) => {
  const input = args.input as CaptchaInput;

  const createdCaptcha = await prisma.captcha.create({
    data: {
      ...input,
      status: 'CREATED',
      text: '',
    },
    select: {
      id: true,
      name: true,
      captchaId: true,
      text: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  await captchaQueue.add(createdCaptcha.captchaId, { captcha: createdCaptcha });

  console.log(`Added captcha ${createdCaptcha.captchaId} into the queue`);

  return createdCaptcha;
};
