/************************* Types *************************/
export type CaptchaStatus = 'CREATED' | 'RESOLVING' | 'RESOLVED';

export type UserStatus = 'ONLINE' | 'OFFLINE' | 'WORKING';

export type UserRole = 'ADMIN' | 'USER';

export type Captcha = {
  id: string;
  captchaId: string;
  name: string;
  text: string;
  status: CaptchaStatus;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  username: string;
  role: UserRole;
  status: UserStatus;
};

/************************* GraphQL Data *************************/

export type CaptchaData = {
  captcha: Captcha;
};

export type AssignedCaptchaData = {
  assignedCaptcha: Captcha;
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

export type UpdateCaptchaData = {
  updateCaptcha: Captcha;
};

export type CaptchaCreatedData = {
  captchaCreated: Captcha;
};

export type OnCaptchaAssignedData = {
  captchaAssigned: Captcha;
};

/************************* GraphQL Inputs *************************/
export type UpdateCaptchaInput = {
  input: {
    captchaId: string;
    text: string;
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
