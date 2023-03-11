/************************* Types *************************/

export type Captcha = {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  username: string;
  role: 'ADMIN' | 'USER';
  online: boolean;
};

/************************* Data *************************/

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

export type UsersData = {
  users: User[];
};

export type LoginData = {
  login: User;
};

/************************* Inputs *************************/
export type CaptchaInput = {
  input: {
    id: string;
    name: string;
    status: 'CREATED' | 'RESOLVING' | 'RESOLVED';
  };
};

export type LoginInput = {
  input: {
    username: string;
    password: string;
  };
};

export type UserIdInput = {
  userId: number;
};
