import { GraphQLClient } from 'graphql-request';

import { GRAPHQL_API } from '../configs.js';

export const client = new GraphQLClient(GRAPHQL_API, { headers: {} });
