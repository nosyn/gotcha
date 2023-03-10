const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  ####################################### Interfaces #######################################
 
  ####################################### Enums #######################################
  enum Status {
    CREATED
    RESOLVING
    RESOLVED
  }

  enum Role {
    ADMIN
    USER
  }

  ####################################### Types #######################################
  type User {
    id: String!
    username: String!
    role: Role!
    online: Boolean!
  }

  type Captcha {
    id: ID!
    captchaId: ID!
    name: String!
    status: Status!
    createdAt: String!
    updatedAt: String!
  }

  ####################################### Inputs #######################################
  input CaptchaInput {
    captchaId: ID!
    name: String!
    status: Status!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  ####################################### Query #######################################
  type Query {
    captchas: [Captcha!]!
    captcha(captchaId: ID!): Captcha
  }

  ####################################### Mutation #######################################
  type Mutation {
    login(input: LoginInput!): User!
    logout: Boolean!
    createCaptcha(input: CaptchaInput!): Captcha!
    updateCaptcha(input: CaptchaInput!): Captcha!
  }

  ####################################### Subscription #######################################
  type Subscription {
    captchaCreated: Captcha!
    captchaAssigned(userId: ID!): Captcha!
    hello: String!
  }
`;

export default typeDefs;
