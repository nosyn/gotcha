/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      me {\n        id\n        username\n        role\n        status\n      }\n      session {\n        jwt\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation UpdateCaptcha($input: ResolveCaptchaInput!) {\n    resolveCaptcha(input: $input) {\n      id\n      captchaId\n      text\n      name\n      status\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateCaptchaDocument,
    "\n  query Me {\n    me {\n      id\n      username\n      role\n      status\n    }\n  }\n": types.MeDocument,
    "\n  query Users {\n    users {\n      id\n      username\n      role\n      status\n    }\n  }\n": types.UsersDocument,
    "\n  query AssignedCaptcha {\n    assignedCaptcha {\n      id\n      captchaId\n      name\n      text\n      status\n      updatedAt\n      createdAt\n    }\n  }\n": types.AssignedCaptchaDocument,
    "\n  query Captchas {\n    captchas {\n      id\n      captchaId\n      text\n      status\n      name\n      createdAt\n      updatedAt\n    }\n  }\n": types.CaptchasDocument,
    "\n  subscription OnAssignCaptcha($input: OnAssignCaptchaInput!) {\n    onAssignCaptcha(input: $input) {\n      id\n      captchaId\n      text\n      name\n      status\n      updatedAt\n      createdAt\n    }\n  }\n": types.OnAssignCaptchaDocument,
    "\n  subscription OnUpdateUser($input: OnUpdateUserInput!) {\n    onUpdateUser(input: $input) {\n      id\n      username\n      role\n      status\n    }\n  }\n": types.OnUpdateUserDocument,
    "\n  subscription OnUpsertCaptcha($input: OnUpsertCaptchaInput) {\n    onUpsertCaptcha(input: $input) {\n      id\n      captchaId\n      name\n      text\n      status\n      createdAt\n      updatedAt\n    }\n  }\n": types.OnUpsertCaptchaDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      me {\n        id\n        username\n        role\n        status\n      }\n      session {\n        jwt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      me {\n        id\n        username\n        role\n        status\n      }\n      session {\n        jwt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCaptcha($input: ResolveCaptchaInput!) {\n    resolveCaptcha(input: $input) {\n      id\n      captchaId\n      text\n      name\n      status\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCaptcha($input: ResolveCaptchaInput!) {\n    resolveCaptcha(input: $input) {\n      id\n      captchaId\n      text\n      name\n      status\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      id\n      username\n      role\n      status\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      username\n      role\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Users {\n    users {\n      id\n      username\n      role\n      status\n    }\n  }\n"): (typeof documents)["\n  query Users {\n    users {\n      id\n      username\n      role\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AssignedCaptcha {\n    assignedCaptcha {\n      id\n      captchaId\n      name\n      text\n      status\n      updatedAt\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query AssignedCaptcha {\n    assignedCaptcha {\n      id\n      captchaId\n      name\n      text\n      status\n      updatedAt\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Captchas {\n    captchas {\n      id\n      captchaId\n      text\n      status\n      name\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query Captchas {\n    captchas {\n      id\n      captchaId\n      text\n      status\n      name\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription OnAssignCaptcha($input: OnAssignCaptchaInput!) {\n    onAssignCaptcha(input: $input) {\n      id\n      captchaId\n      text\n      name\n      status\n      updatedAt\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  subscription OnAssignCaptcha($input: OnAssignCaptchaInput!) {\n    onAssignCaptcha(input: $input) {\n      id\n      captchaId\n      text\n      name\n      status\n      updatedAt\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription OnUpdateUser($input: OnUpdateUserInput!) {\n    onUpdateUser(input: $input) {\n      id\n      username\n      role\n      status\n    }\n  }\n"): (typeof documents)["\n  subscription OnUpdateUser($input: OnUpdateUserInput!) {\n    onUpdateUser(input: $input) {\n      id\n      username\n      role\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription OnUpsertCaptcha($input: OnUpsertCaptchaInput) {\n    onUpsertCaptcha(input: $input) {\n      id\n      captchaId\n      name\n      text\n      status\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  subscription OnUpsertCaptcha($input: OnUpsertCaptchaInput) {\n    onUpsertCaptcha(input: $input) {\n      id\n      captchaId\n      name\n      text\n      status\n      createdAt\n      updatedAt\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;