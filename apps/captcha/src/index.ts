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
  // fs.writeFileSync(path.join(process.cwd(), program.opts().output));

  await uploadFile({
    type: captcha.type,
    buffer: captcha.buffer,
    extension: captcha.extension,
    name: `captcha-${captcha.text}`,
  });

  console.log(`Captcha text: ${captcha.text}`);
  console.log(`Captcha image saved to ${program.opts().output}`);
};

main();
