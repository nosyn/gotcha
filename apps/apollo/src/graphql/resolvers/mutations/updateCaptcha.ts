import { CaptchaInput } from '../../../types.js';
import { prisma } from '../../../prisma/index.js';

export default async (_: any, args: any) => {
  const input = args.input as CaptchaInput;
  const captcha = await prisma.captcha.findUnique({
    where: { captchaId: input.captchaId },
  });

  if (!captcha) {
    throw new Error(`Captcha does not exist with ${input.captchaId} id.`);
  }

  const updatedCaptcha = await prisma.captcha.update({
    where: {
      captchaId: input.captchaId,
    },
    data: {
      ...captcha,
      captchaId: input.captchaId,
      name: input.name,
      status: input.status,
    },
  });

  return updatedCaptcha;
};
