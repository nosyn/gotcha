import { ResolveCaptchaInput } from '../../../types.js';
import { prisma } from '../../../prisma/index.js';

export default async (_: any, args: any) => {
  const input = args.input as ResolveCaptchaInput;
  console.log('input: ', input);
  const captcha = await prisma.captcha.findUnique({
    where: { captchaId: input.captchaId },
  });

  if (!captcha) {
    throw new Error(`Captcha does not exist with ${input.captchaId} id.`);
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

  console.log('resolvedCaptcha: ', resolvedCaptcha);

  return resolvedCaptcha;
};
