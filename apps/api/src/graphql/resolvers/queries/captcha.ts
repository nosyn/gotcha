import { captchasData } from '../../../data.js';

export default (_: string, args: any) => {
  const id = args.id as string;

  const captcha = captchasData.get(id);

  if (!captcha) {
    return null;
  }

  return captcha;
};
