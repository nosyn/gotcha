import { redisClient, Redis, redisOptions } from 'cache';
import { Job, Queue, Worker } from 'bullmq';
import { pubsub, TRIGGERS_ENUM } from '../../graphql/resolvers/pubsub.js';
import { Captcha } from 'database';

type CaptchaQueue = {
  captcha: Captcha;
};

const publishCaptchaToClients = async (job: Job<CaptchaQueue>) => {
  // Publish to client
  pubsub.publish(TRIGGERS_ENUM.CAPTCHA_CREATED, {
    captchaCreated: job.data.captcha,
  });

  pubsub.publish(TRIGGERS_ENUM.CAPTCHA_ASSIGNED, {
    captchaAssigned: job.data.captcha,
  });
};

const worker = new Worker('captcha-queuee', publishCaptchaToClients, {
  connection: new Redis({ ...redisOptions, maxRetriesPerRequest: null }),
});

worker.on('completed', (job, result) => {
  console.log('completed : ', job.id);
  console.log('result: ', result);
});

// Create a new connection in every instance
export const captchaQueue = new Queue<CaptchaQueue>('captcha-queuee', {
  connection: new Redis({ ...redisOptions, maxRetriesPerRequest: null }),
});

captchaQueue.on('waiting', (job) => {
  //   console.log('job waiting: ', job);
});

captchaQueue.on('progress', (job) => {
  console.log('job progress: ', job);
});
