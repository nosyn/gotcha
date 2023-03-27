import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8080/api/graphql',
  documents: ['src/**/*.ts'],
  generates: {
    './src/graphql/_generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
  ignoreNoDocuments: true,
  emitLegacyCommonJSImports: false,
};

export default config;
