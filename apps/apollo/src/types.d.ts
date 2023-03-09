export type CaptchaStatus = 'CREATED' | 'RESOLVING' | 'RESOLVED';

export type Captcha = {
  id: string;
  captchaId: string;
  name: string;
  status: CaptchaStatus;
  createdAt: string;
  updatedAt: string;
};

export type CaptchaInput = {
  captchaId: string;
  name: string;
  status: CaptchaStatus;
};
