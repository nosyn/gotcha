const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  ####################################### Interfaces #######################################
 
  ####################################### Enums #######################################
  enum UserStatus {
    ONLINE
    OFFLINE
    WORKING
  }
  
  enum UserRole {
    ADMIN
    USER
  }

  enum CaptchaStatus {
    CREATED
    RESOLVING
    RESOLVED
  }


  ####################################### Types #######################################
  type User {
    id: String!
    username: String!
    role: UserRole!
    status: UserStatus!
  }

  type Captcha {
    id: ID!
    captchaId: ID!
    name: String!
    status: CaptchaStatus!
    createdAt: String!
    updatedAt: String!
  }

  ####################################### Inputs #######################################
  input CreateCaptchaInput {
    captchaId: ID!
    name: String!
  }

  input UpdateCaptchaInput {
    captchaId: ID!
    name: String!
    text: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input OnUserUpdatedInput {
    userId: ID!
  }

  input OnUpsertCaptchaInput {
    captchaId: ID!
  }

  ####################################### Query #######################################
  type Query {
    me: User!
    users: [User!]!
    captchas: [Captcha!]!
    captcha(captchaId: ID!): Captcha
  }

  ####################################### Mutation #######################################
  type Mutation {
    login(input: LoginInput!): User!
    logout: Boolean!
    createCaptcha(input: CreateCaptchaInput!): Captcha!
    updateCaptcha(input: UpdateCaptchaInput!): Captcha!
  }

  ####################################### Subscription #######################################
  type Subscription {
    onUserUpdated(input: OnUserUpdatedInput!): User!
    onUpsertCaptcha(input: OnUpsertCaptchaInput): Captcha!
    captchaCreated: Captcha!
    captchaAssigned(userId: ID!): Captcha!
    hello: String!
  }
`;

export default typeDefs;
