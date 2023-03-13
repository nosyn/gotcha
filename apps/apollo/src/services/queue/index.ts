import { redisClient, Redis, redisOptions } from 'cache';
import { Job, Queue, Worker } from 'bullmq';
import { pubsub, TRIGGERS_ENUM } from '../../graphql/resolvers/pubsub.js';
import { Captcha } from 'database';
import { prisma } from '../../prisma/index.js';

type CaptchaQueue = {
  captcha: Captcha;
};

const publishCaptchaToClients = async (job: Job<CaptchaQueue>) => {
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

  await pubsub.publish(TRIGGERS_ENUM.ON_UPDATE_USER, { onUpdateUser: selectedUser });

  pubsub.publish(TRIGGERS_ENUM.ON_ASSIGN_CAPTCHA, {
    onAssignCaptcha: job.data.captcha,
    userId: selectedUser.id,
  });

  // Publish to client
  pubsub.publish(TRIGGERS_ENUM.ON_UPSERT_CAPTCHA, {
    onUpsertCaptcha: job.data.captcha,
  });
};

const worker = new Worker('captcha-queuee', publishCaptchaToClients, {
  connection: new Redis({ ...redisOptions, maxRetriesPerRequest: null }),
});

worker.on('completed', (job, result) => {});

// Create a new connection in every instance
export const captchaQueue = new Queue<CaptchaQueue>('captcha-queuee', {
  connection: new Redis({ ...redisOptions, maxRetriesPerRequest: null }),
});

captchaQueue.on('waiting', (job) => {});

captchaQueue.on('progress', (job) => {});
