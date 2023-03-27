/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Captcha = {
  __typename?: 'Captcha';
  captchaId: Scalars['ID'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  status: CaptchaStatus;
  text: Scalars['String'];
  updatedAt: Scalars['String'];
};

export enum CaptchaStatus {
  Created = 'CREATED',
  Resolved = 'RESOLVED',
  Resolving = 'RESOLVING'
}

export type CreateCaptchaInput = {
  captchaId: Scalars['ID'];
  name: Scalars['String'];
};

export type Login = {
  __typename?: 'Login';
  me: User;
  session: Session;
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCaptcha: Captcha;
  login: Login;
  logout: Scalars['Boolean'];
  resolveCaptcha: Captcha;
};


export type MutationCreateCaptchaArgs = {
  input: CreateCaptchaInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationResolveCaptchaArgs = {
  input: ResolveCaptchaInput;
};

export type OnAssignCaptchaInput = {
  userId: Scalars['ID'];
};

export type OnUpdateUserInput = {
  userId: Scalars['ID'];
};

export type OnUpsertCaptchaInput = {
  captchaId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  assignedCaptcha?: Maybe<Captcha>;
  captcha?: Maybe<Captcha>;
  captchas: Array<Captcha>;
  me: User;
  session: Session;
  users: Array<User>;
};


export type QueryCaptchaArgs = {
  captchaId: Scalars['ID'];
};

export type ResolveCaptchaInput = {
  captchaId: Scalars['ID'];
  text: Scalars['String'];
};

export type Session = {
  __typename?: 'Session';
  jwt: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  hello: Scalars['String'];
  onAssignCaptcha: Captcha;
  onUpdateUser: User;
  onUpsertCaptcha: Captcha;
};


export type SubscriptionOnAssignCaptchaArgs = {
  input: OnAssignCaptchaInput;
};


export type SubscriptionOnUpdateUserArgs = {
  input: OnUpdateUserInput;
};


export type SubscriptionOnUpsertCaptchaArgs = {
  input?: InputMaybe<OnUpsertCaptchaInput>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  role: UserRole;
  status: UserStatus;
  username: Scalars['String'];
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export enum UserStatus {
  Offline = 'OFFLINE',
  Online = 'ONLINE',
  Working = 'WORKING'
}

export type AssignedCaptchaQueryVariables = Exact<{ [key: string]: never; }>;


export type AssignedCaptchaQuery = { __typename?: 'Query', assignedCaptcha?: { __typename?: 'Captcha', id: string, captchaId: string, name: string, text: string, status: CaptchaStatus, updatedAt: string, createdAt: string } | null };

export type OnAssignCaptchaSubscriptionVariables = Exact<{
  input: OnAssignCaptchaInput;
}>;


export type OnAssignCaptchaSubscription = { __typename?: 'Subscription', onAssignCaptcha: { __typename?: 'Captcha', id: string, captchaId: string, text: string, name: string, status: CaptchaStatus, updatedAt: string, createdAt: string } };


export const AssignedCaptchaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AssignedCaptcha"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignedCaptcha"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"captchaId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<AssignedCaptchaQuery, AssignedCaptchaQueryVariables>;
export const OnAssignCaptchaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnAssignCaptcha"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OnAssignCaptchaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onAssignCaptcha"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"captchaId"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<OnAssignCaptchaSubscription, OnAssignCaptchaSubscriptionVariables>;