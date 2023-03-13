import crypto from 'node:crypto';

import generateCaptcha from './generateCaptcha.js';
import { uploadFile } from './utils.js';
import { createCaptcha } from './graphql/operations/createCaptcha.js';
import { onUpsertCaptcha } from './graphql/operations/onUpsertCaptcha.js';
import { login } from './graphql/operations/login.js';

export const handleCaptcha = async (strike: boolean) => {
  const captcha = generateCaptcha(strike);

  const id = `captcha_${crypto.randomUUID()}`;
  const fileNameWithExtension = `${id}.${captcha.extension}`;

  await onUpsertCaptcha();

  await uploadFile({
    id,
    name: fileNameWithExtension,
    type: captcha.type,
    buffer: captcha.buffer,
  });

  await createCaptcha({
    captchaId: id,
    name: fileNameWithExtension,
  });
};
