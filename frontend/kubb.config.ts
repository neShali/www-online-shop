import { defineConfig } from '@kubb/core';
import { camelCase } from '@kubb/core/transformers';
import { pluginOas } from '@kubb/plugin-oas';
import { pluginTs } from '@kubb/plugin-ts';
import { pluginReactQuery } from '@kubb/plugin-react-query';

export default defineConfig([
  {
    input: {
      path: `./src/shared/spec/openapi.json`,
    },
    name: 'online-shop',
    output: {
      barrelType: 'all',
      clean: true,
      extension: {
        '.ts': '',
      },
      path: `./src/shared/api/`,
    },

    plugins: [
      pluginOas(),
      pluginTs({
        dateType: 'string',
        enumType: 'asConst',
        group: {
          name: ({ group }) => {
            return `${camelCase(group)}Types`;
          },
          type: 'tag',
        },
        optionalType: 'questionToken',
        output: {
          banner: '',
          path: './types',
        },
        unknownType: 'unknown',
      }),
      pluginReactQuery({
        output: {
          banner: '',
          path: './hooks',
        },
        client: {
          // importPath: '../../../client',
          // dataReturnType: 'data',
          baseURL: 'http://localhost:8000',
        },
        group: {
          name: ({ group }) => {
            return `${camelCase(group)}Hooks`;
          },
          type: 'tag',
        },
        paramsType: 'inline',
        pathParamsType: 'object',
        suspense: {},
      }),
    ],
    root: '.',
  },
]);
