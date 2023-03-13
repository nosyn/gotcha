import { prisma } from '../../../prisma/index.js';
import { captchaQueue } from '../../../services/queue/index.js';
import { CreateCaptchaInput } from '../../../types.js';

export default async (_: any, args: any) => {
  const input = args.input as CreateCaptchaInput;

  const createdCaptcha = await prisma.captcha.create({
    data: {
      ...input,
      status: 'CREATED',
      text: '',
    },
  });

  await captchaQueue.add(createdCaptcha.captchaId, { captcha: createdCaptcha });

  console.log(`Added captcha ${createdCaptcha.captchaId} into the queue`);

  return createdCaptcha;
};
