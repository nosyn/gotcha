import Subscription from './subscriptions/index.js';
import Mutation from './mutations/index.js';
import Query from './queries/index.js';

const resolvers = {
  // Main resolvers
  Query,
  Mutation,
  Subscription,
  Captcha: {
    createdAt: (parent: any) => {
      if (parent.createdAt instanceof Date) {
        return parent.createdAt.toUTCString();
      }

      return parent.createdAt;
    },
    updatedAt: (parent: any) => {
      if (parent.updatedAt instanceof Date) {
        return parent.updatedAt.toUTCString();
      }

      return parent.updatedAt;
    },
  },
};

export default resolvers;
