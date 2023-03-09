import { redisOptions } from 'cache';
import { CaptchaInput } from '../../../types.js';
import { pubsub, TRIGGERS_ENUM } from '../pubsub.js';
import { Queue, Worker, QueueEvents } from 'bullmq';
import { prisma } from '../../../prisma/index.js';

const queue = new Queue('Paint', {
  connection: redisOptions,
});

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const paintCar = async (color: string, id?: string) => {
  console.log('Car is painting with: ', color, id);

  await sleep(5000);

  console.log('Car was painted with: ', color, id);
};

const worker = new Worker(
  'Paint',
  async (job) => {
    if (job.name === 'cars') {
      await paintCar(job.data.color, job.id);
    }
  },
  {
    connection: redisOptions,
  }
);

const queueEvents = new QueueEvents('Paint', {
  connection: redisOptions,
});

queueEvents.on('completed', ({ jobId }) => {
  console.log('done painting: ', jobId);
});

queueEvents.on(
  'failed',
  ({ jobId, failedReason }: { jobId: string; failedReason: string }) => {
    console.error('error painting', failedReason);
  }
);

export default async (_: any, args: any) => {
  const input = args.input as CaptchaInput;
  // const captcha = captchasData.get(args.input.id);

  // if (captcha) {
  //   throw new Error(`Captcha already exists with ${input.id} id.`);
  // }

  // queue.add('cars', { color: 'blue' });
  console.log('input: ', input);

  const createdCaptcha = await prisma.captcha.create({
    data: {
      ...input,
      answer: '',
    },
    select: {
      id: true,
      name: true,
      captchaId: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  console.log('createdCaptcha: ', createdCaptcha);
  console.log('createdAt: ', typeof createdCaptcha.createdAt);
  console.log('updatedAt: ', typeof createdCaptcha.updatedAt);

  // Publish to client
  pubsub.publish(TRIGGERS_ENUM.CAPTCHA_CREATED, {
    captchaCreated: createdCaptcha,
  });

  pubsub.publish(TRIGGERS_ENUM.CAPTCHA_ASSIGNED, {
    captchaAssigned: createdCaptcha,
  });

  return createdCaptcha;
};
