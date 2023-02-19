// Standard libraries
import fs from 'node:fs';
import util from 'node:util';
import { pipeline } from 'node:stream';
import path from 'node:path';

// Packages
import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { StatusCodes } from 'http-status-codes';

// Files
import { staticFilesPath } from '../server.js';

const SUPPORTED_MIME_TYPES = ['image/png'];

const pump = util.promisify(pipeline);

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
export default async function routes(
  fastify: FastifyInstance,
  options: Object
) {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' };
  });

  fastify.post('/file', async function (req, reply) {
    // process a single file
    // also, consider that if you allow to upload multiple files
    // you must consume all files otherwise the promise will never fulfill
    const data = await req.file();

    if (!data) {
      reply.code(StatusCodes.BAD_REQUEST).send({
        error: 'Missing input',
      });
      return;
    }

    if (!SUPPORTED_MIME_TYPES.includes(data.mimetype)) {
      reply.code(StatusCodes.UNSUPPORTED_MEDIA_TYPE).send({
        error: `${data.mimetype} is not supported`,
      });
      return;
    }

    await pump(
      data.file,
      fs.createWriteStream(path.join(staticFilesPath, data.filename))
    );

    await reply.status(200).send({
      message: 'OK',
      payload: {
        name: data.filename,
      },
    });
  });

  fastify.get('/file', function (req, reply) {
    reply.sendFile('captcha.png');
  });
}
