import { Command } from 'commander';
import { handleCaptcha } from './handleCaptcha.js';

const main = async () => {
  const program = new Command();

  program
    .version('1.0.0')
    .option('-o, --output <filename>', 'output filename', 'captcha.png')
    .option('-s, --strike', 'add strikethrough to text', false)
    .parse(process.argv);

  await handleCaptcha(program.opts().strike);
};

main();
