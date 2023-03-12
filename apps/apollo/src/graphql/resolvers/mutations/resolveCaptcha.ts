import { ResolveCaptchaInput } from '../../../types.js';
import { prisma } from '../../../prisma/index.js';
import { TRIGGERS_ENUM, pubsub } from '../pubsub.js';

export default async (_: any, args: any, context: any) => {
  const input = args.input as ResolveCaptchaInput;

  const captcha = await prisma.captcha.findUnique({
    where: { captchaId: input.captchaId },
  });

  if (!captcha) {
    throw new Error(`Captcha with id ${input.captchaId} does not exist .`);
  }

  if (captcha.status === 'RESOLVED') {
    throw new Error(`Captcha with id ${input.captchaId} has been already resolved.`);
  }

  const resolvedCaptcha = await prisma.captcha.update({
    where: {
      captchaId: input.captchaId,
    },
    data: {
      ...captcha,
      captchaId: input.captchaId,
      text: input.text,
      status: 'RESOLVED',
    },
  });

  const updatedUser = await prisma.user.update({
    where: {
      id: context.req.session.user.id,
    },
    data: {
      status: 'ONLINE',
    },
  });

  await pubsub.publish(TRIGGERS_ENUM.ON_USER_UPDATED, { onUserUpdated: updatedUser });

  return resolvedCaptcha;
};
