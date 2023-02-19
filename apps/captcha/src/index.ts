import * as fs from 'node:fs';
import * as path from 'node:path';
import { Command } from 'commander';
import generateCaptcha from './generateCaptcha.js';
import { uploadFile } from './utils.js';

const main = async () => {
  const program = new Command();

  program
    .version('1.0.0')
    .option('-o, --output <filename>', 'output filename', 'captcha.png')
    .option('-s, --strike', 'add strikethrough to text', false)
    .parse(process.argv);

  const captcha = generateCaptcha(program.opts().strike);

  setTimeout(
    async () =>
      await uploadFile({
        type: captcha.type,
        buffer: captcha.buffer,
        extension: captcha.extension,
        name: `captcha-${captcha.text}`,
      }),
    1000
  );
};

main();
