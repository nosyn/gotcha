import Subscription from './subscriptions/index.js';
import Mutation from './mutations/index.js';
import Query from './queries/index.js';

const resolvers = {
  // Main resolvers
  Query,
  Mutation,
  Subscription,
};

export default resolvers;
