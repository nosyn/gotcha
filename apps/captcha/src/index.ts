import * as fs from "fs";
import * as path from "path";
import { Command } from "commander";
import generateCaptcha from "./generateCaptcha";

const main = () => {
  const program = new Command();

  program
    .version("1.0.0")
    .option("-o, --output <filename>", "output filename", "captcha.png")
    .option("-s, --strike", "add strikethrough to text", false)
    .parse(process.argv);

  const captcha = generateCaptcha(program.opts().strike);
  fs.writeFileSync(
    path.join(process.cwd(), program.opts().output),
    Buffer.from(captcha.image, "base64")
  );
  console.log(`Captcha text: ${captcha.text}`);
  console.log(`Captcha image saved to ${program.opts().output}`);
};

main();
