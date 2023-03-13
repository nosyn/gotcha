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
  Resolving = 'RESOLVING',
}

export type CreateCaptchaInput = {
  captchaId: Scalars['ID'];
  name: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Me = {
  __typename?: 'Me';
  me: User;
  session: Session;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCaptcha: Captcha;
  login: Me;
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
  User = 'USER',
}

export enum UserStatus {
  Offline = 'OFFLINE',
  Online = 'ONLINE',
  Working = 'WORKING',
}

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'Me';
    me: { __typename?: 'User'; id: string; username: string; role: UserRole; status: UserStatus };
    session: { __typename?: 'Session'; jwt: string };
  };
};

export type CreateCaptchaMutationVariables = Exact<{
  input: CreateCaptchaInput;
}>;

export type CreateCaptchaMutation = {
  __typename?: 'Mutation';
  createCaptcha: {
    __typename?: 'Captcha';
    id: string;
    captchaId: string;
    name: string;
    status: CaptchaStatus;
    createdAt: string;
    updatedAt: string;
  };
};

export type OnUpsertCaptchaSubscriptionVariables = Exact<{
  input?: InputMaybe<OnUpsertCaptchaInput>;
}>;

export type OnUpsertCaptchaSubscription = {
  __typename?: 'Subscription';
  onUpsertCaptcha: {
    __typename?: 'Captcha';
    id: string;
    captchaId: string;
    name: string;
    text: string;
    status: CaptchaStatus;
    createdAt: string;
    updatedAt: string;
  };
};

export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Login' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'LoginInput' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'me' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'session' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'jwt' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const CreateCaptchaDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateCaptcha' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateCaptchaInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCaptcha' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'captchaId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateCaptchaMutation, CreateCaptchaMutationVariables>;
export const OnUpsertCaptchaDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'OnUpsertCaptcha' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'OnUpsertCaptchaInput' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'onUpsertCaptcha' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'captchaId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<OnUpsertCaptchaSubscription, OnUpsertCaptchaSubscriptionVariables>;
