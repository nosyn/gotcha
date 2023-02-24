export type CaptchaStatus = 'CREATED' | 'RESOLVING' | 'RESOLVED';

export type Captcha = {
  id: string;
  name: string;
  status: CaptchaStatus;
  createdAt: string;
  updatedAt: string;
};

export type CaptchaInput = {
  id: string;
  name: string;
  status: CaptchaStatus;
};
