import { captchasData } from '../../../data.js';
import { CaptchaInput } from '../../../types.js';

export default (_: any, args: any) => {
  const input = args.input as CaptchaInput;
  const captcha = captchasData.get(input.id);

  if (!captcha) {
    throw new Error(`Captcha does not exist with ${input.id} id.`);
  }

  captchasData.set(input.id, {
    ...captcha,
    id: input.id,
    name: input.name,
    status: input.status,
    updatedAt: new Date().toISOString(),
  });

  return captchasData.get(input.id);
};
