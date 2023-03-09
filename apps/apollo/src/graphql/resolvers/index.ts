import Subscription from './subscriptions/index.js';
import Mutation from './mutations/index.js';
import Query from './queries/index.js';

const resolvers = {
  // Main resolvers
  Query,
  Mutation,
  Subscription,
  Captcha: {
    updatedAt: (parent: any) => parent.updatedAt.toUTCString(),
    createdAt: (parent: any) => parent.updatedAt.toUTCString(),
  },
};

export default resolvers;
