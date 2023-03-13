
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8080/api/graphql",
  documents: "src/graphql/documents/**/*.ts",
  generates: {
    "src/graphql/__generated__/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
