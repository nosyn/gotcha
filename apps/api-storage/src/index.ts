import { PORT } from './configs.js';

import server from './server.js';

const start = async () => {
  try {
    await server.listen({ port: PORT });

    const address = server.server.address();

    server.log.info(
      `Server is listening at port:  ${
        typeof address === 'string' ? address : address?.port
      }`
    );
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
