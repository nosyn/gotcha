// Standard libraries
import fs from 'node:fs';
import util from 'node:util';
import { pipeline } from 'node:stream';
import path from 'node:path';

// Packages
import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

// Files
import { staticFilesPath } from '../configs.js';
import { generateErrorResponse } from '../utils.js';

const SUPPORTED_MIME_TYPES = ['image/png'];

const pump = util.promisify(pipeline);

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} _options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
export default async function routes(
  fastify: FastifyInstance,
  _options: Object
) {
  /**
   * GET
   */
  const getOpts: RouteShorthandOptions = {
    schema: {
      params: {
        name: {
          type: 'string',
        },
      },
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
  fastify.get('/image/:name', getOpts, function (req, reply) {
    const { name } = req.params as any;

    if (!name) {
      reply.status(StatusCodes.NOT_FOUND).send({
        message: 'Not found',
        error: getReasonPhrase(StatusCodes.NOT_FOUND),
        statusCode: StatusCodes.NOT_FOUND,
      });
      return;
    }

    reply.sendFile(name);
  });

  /**
   * POST
   */
  const postOpts: RouteShorthandOptions = {
    schema: {
      params: {
        name: {
          type: 'string',
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
            name: {
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
  fastify.post('/image', postOpts, async function (req, reply) {
    // process a single file
    const data = await req.file();

    if (!data) {
      reply.code(StatusCodes.BAD_REQUEST).send({
        error: 'Missing input',
      });
      return;
    }

    if (!SUPPORTED_MIME_TYPES.includes(data.mimetype)) {
      reply.code(StatusCodes.UNSUPPORTED_MEDIA_TYPE).send(
        generateErrorResponse({
          message: `${data.mimetype} is not supported`,
          statusCode: StatusCodes.UNSUPPORTED_MEDIA_TYPE,
        })
      );
      return;
    }

    await pump(
      data.file,
      fs.createWriteStream(path.join(staticFilesPath, data.filename))
    );

    await reply.status(200).send({
      message: 'OK',
      name: data.filename,
      timeStamp: new Date().toUTCString(),
    });
  });
}
