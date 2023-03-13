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

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Login', me: { __typename?: 'User', id: string, username: string, role: UserRole, status: UserStatus }, session: { __typename?: 'Session', jwt: string } } };

export type UpdateCaptchaMutationVariables = Exact<{
  input: ResolveCaptchaInput;
}>;


export type UpdateCaptchaMutation = { __typename?: 'Mutation', resolveCaptcha: { __typename?: 'Captcha', id: string, captchaId: string, text: string, name: string, status: CaptchaStatus, createdAt: string, updatedAt: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, username: string, role: UserRole, status: UserStatus } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, username: string, role: UserRole, status: UserStatus }> };

export type AssignedCaptchaQueryVariables = Exact<{ [key: string]: never; }>;


export type AssignedCaptchaQuery = { __typename?: 'Query', assignedCaptcha?: { __typename?: 'Captcha', id: string, captchaId: string, name: string, text: string, status: CaptchaStatus, updatedAt: string, createdAt: string } | null };

export type CaptchasQueryVariables = Exact<{ [key: string]: never; }>;


export type CaptchasQuery = { __typename?: 'Query', captchas: Array<{ __typename?: 'Captcha', id: string, captchaId: string, text: string, status: CaptchaStatus, name: string, createdAt: string, updatedAt: string }> };

export type OnAssignCaptchaSubscriptionVariables = Exact<{
  input: OnAssignCaptchaInput;
}>;


export type OnAssignCaptchaSubscription = { __typename?: 'Subscription', onAssignCaptcha: { __typename?: 'Captcha', id: string, captchaId: string, text: string, name: string, status: CaptchaStatus, updatedAt: string, createdAt: string } };

export type OnUpdateUserSubscriptionVariables = Exact<{
  input: OnUpdateUserInput;
}>;


export type OnUpdateUserSubscription = { __typename?: 'Subscription', onUpdateUser: { __typename?: 'User', id: string, username: string, role: UserRole, status: UserStatus } };

export type OnUpsertCaptchaSubscriptionVariables = Exact<{
  input?: InputMaybe<OnUpsertCaptchaInput>;
}>;


export type OnUpsertCaptchaSubscription = { __typename?: 'Subscription', onUpsertCaptcha: { __typename?: 'Captcha', id: string, captchaId: string, name: string, text: string, status: CaptchaStatus, createdAt: string, updatedAt: string } };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"session"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jwt"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const UpdateCaptchaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCaptcha"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResolveCaptchaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolveCaptcha"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"captchaId"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateCaptchaMutation, UpdateCaptchaMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const AssignedCaptchaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AssignedCaptcha"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignedCaptcha"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"captchaId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<AssignedCaptchaQuery, AssignedCaptchaQueryVariables>;
export const CaptchasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Captchas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"captchas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"captchaId"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CaptchasQuery, CaptchasQueryVariables>;
export const OnAssignCaptchaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnAssignCaptcha"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OnAssignCaptchaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onAssignCaptcha"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"captchaId"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<OnAssignCaptchaSubscription, OnAssignCaptchaSubscriptionVariables>;
export const OnUpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnUpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OnUpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onUpdateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<OnUpdateUserSubscription, OnUpdateUserSubscriptionVariables>;
export const OnUpsertCaptchaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnUpsertCaptcha"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OnUpsertCaptchaInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onUpsertCaptcha"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"captchaId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<OnUpsertCaptchaSubscription, OnUpsertCaptchaSubscriptionVariables>;