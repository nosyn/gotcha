import { GraphQLError, GraphQLErrorOptions } from 'graphql';

const createCustomApolloErrors = (
  message: string,
  options?: GraphQLErrorOptions
): GraphQLError => new GraphQLError(message, options);

export const ApolloErrors = Object.freeze({
  UNAUTHORIZED: createCustomApolloErrors(
    'You are not authorized to perform this action.',
    {
      extensions: {
        code: 'FORBIDDEN',
      },
    }
  ),
});
