enum CaptchaStatus {
  CREATED = 'CREATED',
  RESOLVING = 'RESOLVING',
  RESOLVED = 'RESOLVED',
}

type Captcha = {
  id: string;
  name: string;
  status: CaptchaStatus;
  createdAt: string;
  updatedAt: string;
};

type CaptchaInput = {
  id: string;
  name: string;
  status: CaptchaStatus;
};

const captchas: Map<string, Captcha> = new Map();

const resolvers = {
  Query: {
    captchas: () => captchas.values(),
    captcha: (id: string) => {
      const captcha = captchas.get(id);

      if (!captcha) {
        return null;
      }

      return captcha;
    },
  },
  Mutation: {
    createCaptcha: (input: CaptchaInput) => {
      const captcha = captchas.get(input.id);

      if (captcha) {
        throw new Error(`Captcha already exists with ${input.id} id.`);
      }

      captchas.set(input.id, {
        id: input.id,
        name: input.name,
        status: input.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return captchas.get(input.id);
    },
    updateCaptcha: (input: CaptchaInput) => {
      const captcha = captchas.get(input.id);

      if (!captcha) {
        throw new Error(`Captcha does not exist with ${input.id} id.`);
      }

      captchas.set(input.id, {
        ...captcha,
        id: input.id,
        name: input.name,
        status: input.status,
        updatedAt: new Date().toISOString(),
      });

      return captchas.get(input.id);
    },
  },
};

export default resolvers;
