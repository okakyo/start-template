
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:5050/graphql",
  documents: "graphql/**/*.gql",
  generates: {
    "src/graphql/generated/": {
      preset: "client",
      plugins: ['typescript','typescript-operations','typescript-react-apollo']
    },
  }
};

export default config;
