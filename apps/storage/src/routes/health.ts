import { FastifyInstance, RouteShorthandOptions } from 'fastify';

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
          timeStamp: {
            type: 'string',
          },
        },
      },
    },
  },
};

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} _options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
export default async function routes(
  fastify: FastifyInstance,
  _options: Object
) {
  fastify.get('/health', opts, async (request, reply) => {
    return {
      message: 'Storage Server is up and healthy',
      timeStamp: new Date().toUTCString(),
    };
  });
}
