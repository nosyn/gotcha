import { FastifyInstance, RouteShorthandOptions } from 'fastify';

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string',
          },
        },
      },
    },
  },
};

export default async function routes(
  fastify: FastifyInstance,
  options: Object
) {
  fastify.get('/ping', opts, async (request, reply) => {
    return { pong: 'it worked!' };
  });
}
