/************************* Datas *************************/
export type Captcha = {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type CaptchaCreatedData = {
  captchaCreated: Captcha;
};

export type CaptchaAssignedData = {
  captchaAssigned: Captcha;
};

export type CaptchaData = {
  captcha: Captcha;
};

export type CaptchasData = {
  captchas: Captcha[];
};

/************************* Inputs *************************/
export type CaptchaInput = {
  input: {
    id: string;
    name: string;
    status: 'CREATED' | 'RESOLVING' | 'RESOLVED';
  };
};

export type IDInput = {
  id: number;
};
