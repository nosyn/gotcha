import fastify from "fastify";
import fastifyMultipart from "@fastify/multipart";
import type { FastifyInstance, RouteShorthandOptions } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import util from "util";
import { pipeline } from "stream";
import { StatusCodes } from "http-status-codes";

const pump = util.promisify(pipeline);

const server: FastifyInstance = fastify({});
server.register(fastifyMultipart, {
  limits: {
    fieldNameSize: 100, // Max field name size in bytes
    fieldSize: 100, // Max field value size in bytes
    fields: 10, // Max number of non-file fields
    fileSize: 10 * 1024 * 1024, // For multipart forms, the max file size in bytes ~ 10MB
    files: 1, // Max number of file fields
    headerPairs: 2000, // Max number of header key=>value pairs
  },
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

  await pump(data.file, fs.createWriteStream(data.filename));

  // be careful of permission issues on disk and not overwrite
  // sensitive files that could cause security risks

  // also, consider that if the file stream is not consumed, the promise will never fulfill

  reply.send({ hello: "word" });
});

export default server;
