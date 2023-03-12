import { redisClient, Redis, redisOptions } from 'cache';
import { Job, Queue, Worker } from 'bullmq';
import { pubsub, TRIGGERS_ENUM } from '../../graphql/resolvers/pubsub.js';
import { Captcha } from 'database';
import { prisma } from '../../prisma/index.js';

type CaptchaQueue = {
  captcha: Captcha;
};

const publishCaptchaToClients = async (job: Job<CaptchaQueue>) => {
  // Publish to client
  pubsub.publish(TRIGGERS_ENUM.ON_CAPTCHA_CREATED, {
    captchaCreated: job.data.captcha,
  });

  const firstOnlineUser = await prisma.user.findFirst({
    where: {
      role: 'USER',
      status: 'ONLINE',
    },
  });

  if (!firstOnlineUser) {
    console.error('TODO: Need to update logic here when there is no online users');
    return;
  }

  // Update status to WORKING
  const selectedUser = await prisma.user.update({
    where: {
      id: firstOnlineUser.id,
    },
    data: {
      status: 'WORKING',
    },
    select: {
      id: true,
      status: true,
      username: true,
      role: true,
    },
  });

  await pubsub.publish(TRIGGERS_ENUM.ON_USER_UPDATED, { onUserUpdated: selectedUser });

  pubsub.publish(TRIGGERS_ENUM.CAPTCHA_ASSIGNED, {
    captchaAssigned: job.data.captcha,
    userId: selectedUser.id,
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
