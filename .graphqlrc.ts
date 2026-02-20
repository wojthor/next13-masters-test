import type { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
	overwrite: true,
	schema: process.env.GRAPHQL_URL,
	ignoreNoDocuments: true,
	documents: "src/graphql/*.graphql",
	generates: {
		"src/gql/": {
			preset: "client",
			presetConfig: {
				fragmentMasking: false,
			},
			config: {
				defaulScalarType: "unknown",
				enumsAsTypes: true,
				useTypeImports: true,
				skipTypename: true,
				documentMode: "string",
			},
			plugins: [],
		},
		"schema.graphql": {
			plugins: ["schema-ast"],
		},
	},
};

export default config;
