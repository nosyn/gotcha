import crypto from 'node:crypto';

import { generateCaptcha } from './services/generateCaptcha.js';
import { createCaptcha } from './graphql/operations/createCaptcha.js';
import { onUpsertCaptcha } from './graphql/operations/onUpsertCaptcha.js';
import { uploadFile } from './services/uploadFile.js';
import { login } from './graphql/operations/login.js';

export const handleCaptcha = async (strike: boolean) => {
  const captcha = generateCaptcha(strike);

  const id = `captcha_${crypto.randomUUID()}`;
  const fileNameWithExtension = `${id}.${captcha.extension}`;

  await login({
    username: 'user_2',
    password: 'password',
  });

  await onUpsertCaptcha({
    captchaId: id,
  });

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
