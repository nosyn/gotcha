export type CaptchaStatus = 'CREATED' | 'RESOLVING' | 'RESOLVED';

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
    captcha: (_: string, args: any) => {
      const id = args.id as string;

      const captcha = captchas.get(id);

      if (!captcha) {
        return null;
      }

      return captcha;
    },
  },
  Mutation: {
    createCaptcha: (_: any, args: any) => {
      const input = args.input as CaptchaInput;
      const captcha = captchas.get(args.input.id);

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
    updateCaptcha: (_: any, args: any) => {
      const input = args.input as CaptchaInput;
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
