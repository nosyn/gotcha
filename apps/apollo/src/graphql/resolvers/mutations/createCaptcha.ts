import { captchasData } from '../../../data.js';
import { CaptchaInput } from '../../../types.js';
import { pubsub, TRIGGERS_ENUM } from '../pubsub.js';

export default (_: any, args: any) => {
  const input = args.input as CaptchaInput;
  const captcha = captchasData.get(args.input.id);

  if (captcha) {
    throw new Error(`Captcha already exists with ${input.id} id.`);
  }

  captchasData.set(input.id, {
    id: input.id,
    name: input.name,
    status: input.status,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const captchaCreated = captchasData.get(input.id);

  // Publish to client
  pubsub.publish(TRIGGERS_ENUM['CAPTCHA_CREATED'], { captchaCreated });

  return captchaCreated;
};
