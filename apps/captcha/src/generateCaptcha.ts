import { createCanvas, CanvasRenderingContext2D } from 'canvas';

const WIDTH = 300;
const HEIGHT = 100;
const CHARACTERS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const IMAGE_TYPE = 'image/png';
const IMAGE_EXTENSION = 'png';

export type CaptchaImage = {
  text: string;
  buffer: Buffer;
  extension: string;
  type: string;
};

function generateCaptcha(useStrikeThrough: boolean): CaptchaImage {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

  // Create background gradient
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  gradient.addColorStop(0, randomColor());
  gradient.addColorStop(1, randomColor());
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Add random characters to captcha
  let captchaText = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * CHARACTERS.length);
    const randomChar = CHARACTERS.charAt(randomIndex);
    captchaText += randomChar;

    // Add character to canvas
    const fontSize = Math.floor(Math.random() * 20) + 60;
    const x = 40 + i * 40;
    const y = 70 + Math.floor(Math.random() * 20) - 15;
    ctx.font = `${fontSize}px Hack`;
    ctx.fillStyle = randomColor();
    ctx.fillText(randomChar, x, y);

    // Add strikethrough if option is specified
    if (useStrikeThrough) {
      const strikethroughY = Math.floor(Math.random() * 40) + 30;
      ctx.beginPath();
      ctx.moveTo(x, strikethroughY);
      ctx.lineTo(x + 40, strikethroughY);
      ctx.strokeStyle = randomColor();
      ctx.stroke();
    }
  }

  const imageBuffer = canvas.toBuffer(IMAGE_TYPE);

  return {
    text: captchaText,
    buffer: imageBuffer,
    type: IMAGE_TYPE,
    extension: IMAGE_EXTENSION,
  };
}

function randomColor(): string {
  return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;
}

export default generateCaptcha;
