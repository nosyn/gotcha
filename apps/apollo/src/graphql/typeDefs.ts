const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  ####################################### Interfaces #######################################
 
  ####################################### Enums #######################################
  enum Status {
    CREATED
    RESOLVING
    RESOLVED
  }

  ####################################### Types #######################################
  type Book {
    title: String
    author: String
  }

  type Captcha {
    id: ID!
    name: ID!
    status: Status!
    createdAt: String!
    updatedAt: String!
  }

  ####################################### Inputs #######################################
  input CaptchaInput {
    id: ID!
    name: String!
    status: Status!
  }

  ####################################### Query #######################################
  type Query {
    captchas: [Captcha!]!
    captcha(id: ID!): Captcha
  }

  ####################################### Mutation #######################################
  type Mutation {
    createCaptcha(input: CaptchaInput!): Captcha!
    updateCaptcha(input: CaptchaInput!): Captcha!
  }

  ####################################### Subscription #######################################
  type Subscription {
    captchaCreated: Captcha
    hello: String!
  }
`;

export default typeDefs;
