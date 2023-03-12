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

export type CaptchaQuery = {
  captcha: Captcha;
};

export type AssignedCaptchaQuery = {
  assignedCaptcha: Captcha;
};

export type CaptchasData = {
  captchas: Captcha[];
};

export type UsersQuery = {
  users: User[];
};

export type LoginData = {
  login: User;
};

export type UpdateCaptchaQuery = {
  updateCaptcha: Captcha;
};

export type OnCreateCaptchaSubscription = {
  onCreateCaptcha: Captcha;
};

export type OnAssignCaptchaSubscription = {
  onAssignCaptcha: Captcha;
};

/************************* GraphQL Inputs *************************/
export type Input<T> = {
  input: T;
};

export type UpdateCaptchaInput = Input<{
  captchaId: string;
  text: string;
}>;

export type LoginInput = Input<{
  username: string;
  password: string;
}>;

export type OnAssignCaptchaInput = Input<{
  userId: number;
}>;
