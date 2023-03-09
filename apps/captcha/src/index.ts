import { Command } from 'commander';
import { createCaptcha } from './graphql/client.js';
import generateCaptcha from './generateCaptcha.js';
import { uploadFile } from './utils.js';
import crypto from 'node:crypto';

const main = async () => {
  const program = new Command();

  program
    .version('1.0.0')
    .option('-o, --output <filename>', 'output filename', 'captcha.png')
    .option('-s, --strike', 'add strikethrough to text', false)
    .parse(process.argv);

  setInterval(async () => {
    const captcha = generateCaptcha(program.opts().strike);

    const id = `captcha_${crypto.randomUUID()}`;
    const fileNameWithExtension = `${id}.${captcha.extension}`;

    await uploadFile({
      id,
      name: fileNameWithExtension,
      type: captcha.type,
      buffer: captcha.buffer,
    });

    await createCaptcha({
      captchaId: id,
      name: fileNameWithExtension,
      status: 'CREATED',
    });
  }, 10000000);
};

main();
