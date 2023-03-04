import { MyContext } from '../server.js';
import { GraphQLRequestContext, GraphQLRequestListener } from '@apollo/server';

export const loggers = {
  // Fires whenever a GraphQL request is received from a client.
  async requestDidStart(
    requestContext: GraphQLRequestContext<MyContext>
  ): Promise<GraphQLRequestListener<MyContext> | void> {
    // Skip introspection query
    if (requestContext.request.operationName === 'IntrospectionQuery') {
      return;
    }

    console.log('Query started: ', requestContext.request.operationName);

    return {
      // More info: https://www.apollographql.com/docs/apollo-server/integrations/plugins-event-reference/ && https://www.apollographql.com/docs/apollo-server/integrations/plugins
      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      //   async parsingDidStart(requestContext) {
      //     console.log('Parsing started!');
      //   },
      // Fires whenever Apollo Server will validate a
      // request's document AST against your GraphQL schema.
      //   async validationDidStart(requestContext) {
      //     console.log('Validation started!');
      //   },
    };
  },
};
