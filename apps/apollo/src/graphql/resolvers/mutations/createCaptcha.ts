import { prisma } from '../../../prisma/index.js';
import { CaptchaInput } from '../../../types.js';
import { pubsub, TRIGGERS_ENUM } from '../pubsub.js';

export default async (_: any, args: any) => {
  const input = args.input as CaptchaInput;

  console.log('input: ', input);

  const createdCaptcha = await prisma.captcha.create({
    data: {
      ...input,
      answer: '',
    },
    select: {
      id: true,
      name: true,
      captchaId: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  // Publish to client
  pubsub.publish(TRIGGERS_ENUM.CAPTCHA_CREATED, {
    captchaCreated: createdCaptcha,
  });

  pubsub.publish(TRIGGERS_ENUM.CAPTCHA_ASSIGNED, {
    captchaAssigned: createdCaptcha,
  });

  return createdCaptcha;
};
