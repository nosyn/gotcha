import { ApolloErrors } from '../../../errors/index.js';

export default async (_: string, args: any, context: any) => {
  const { user } = context.req.session;

  if (!user) {
    throw ApolloErrors.UNAUTHORIZED;
  }

  return user;
};
