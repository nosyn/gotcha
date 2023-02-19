// Standard libs imports
import fs from "node:fs";
import util from "node:util";
import { pipeline } from "node:stream";
import { StatusCodes } from "http-status-codes";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "node:path";

import fastify from "fastify";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import type { FastifyInstance, RouteShorthandOptions } from "fastify";

const __dirname = dirname(fileURLToPath(import.meta.url));

const pump = util.promisify(pipeline);

const server: FastifyInstance = fastify({
  logger: {
    level: "trace",
  },
});
server.register(fastifyMultipart, {
  limits: {
    fieldNameSize: 100, // Max field name size in bytes
    fieldSize: 100, // Max field value size in bytes
    fields: 10, // Max number of non-file fields
    fileSize: 20 * 1024, // For multipart forms, the max file size in bytes ~ 20kb
    files: 1, // Max number of file fields
    headerPairs: 2000, // Max number of header key=>value pairs
  },
});

server.register(fastifyStatic, {
  root: __dirname,
});

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          pong: {
            type: "string",
          },
        },
      },
    },
  },
};

server.get("/health", opts, async (request, reply) => {
  return true;
});

server.get("/ping", opts, async (request, reply) => {
  return { pong: "it worked!" };
});

const SUPPORTED_MIME_TYPES = ["image/png"];
server.post("/file", async function (req, reply) {
  // process a single file
  // also, consider that if you allow to upload multiple files
  // you must consume all files otherwise the promise will never fulfill
  const data = await req.file();

  if (!data) {
    reply.code(StatusCodes.BAD_REQUEST).send({
      error: "Missing input",
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
    fs.createWriteStream(path.join(__dirname, data.filename))
  );

  // be careful of permission issues on disk and not overwrite
  // sensitive files that could cause security risks

  // also, consider that if the file stream is not consumed, the promise will never fulfill

  reply.send({ hello: "word" });
});

server.get("/file", function (req, reply) {
  reply.sendFile("captcha.png");
});

export default server;
