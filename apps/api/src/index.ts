// Load envs from ".env"
import * as dotenv from "dotenv";
dotenv.config();

import server from "./server";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const port = !isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : 5001;

const start = async () => {
  try {
    await server.listen({ port });

    const address = server.server.address();

    console.info(
      `Server is listening at port:  ${
        typeof address === "string" ? address : address?.port
      }`
    );
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
