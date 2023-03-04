export default {
  // Example using an async generator
  subscribe: async function* () {
    for await (const word of ['Hello', 'Bonjour', 'Ciao']) {
      yield { hello: word };
    }
  },
};
