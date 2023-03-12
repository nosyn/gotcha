/************************* Types *************************/
type UserStatus = 'ONLINE' | 'OFFLINE' | 'WORKING';

type UserRole = 'ADMIN' | 'USER';

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
  role: UserRole;
  status: UserStatus;
};

/************************* Data *************************/

export type CaptchaCreatedData = {
  captchaCreated: Captcha;
};

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

export type OnCaptchaAssignedData = {
  captchaAssigned: Captcha;
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
