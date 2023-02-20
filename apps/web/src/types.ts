export type Captcha = {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type CaptchaData = {
  captcha: Captcha;
};

export type CaptchasData = {
  captchas: Captcha[];
};

export type CaptchaInput = {
  input: {
    id: string;
    name: string;
    status: 'CREATED' | 'RESOLVING' | 'RESOLVED';
  };
};
