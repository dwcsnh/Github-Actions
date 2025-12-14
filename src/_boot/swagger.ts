import { makeModule } from '@/context';
import { resolve } from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

type SwaggerConfig = {
  swagger: {
    title: string;
    version: string;
    basePath: string;
    docEndpoint: string;
  };
};

const swagger = makeModule('swagger', async ({ container: { build }, config: { http, swagger } }) => {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: swagger.title,
        version: swagger.version,
      },
      servers: [
        {
          url: swagger.basePath,
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'JWT Authorization header using the Bearer scheme. Example: "Bearer {token}"',
          },
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
    apis: [resolve(__dirname, '../**/interface/http/**/*.yaml'), resolve(__dirname, '../**/interface/http/**/index.ts')],
  };

  // Initialize swagger-jsdoc -> returns validated swagger spec in json format
  const swaggerSpec = swaggerJSDoc(options);

  build(({ server }) => {
    server.use(swagger.docEndpoint, swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
  });
});

export { swagger };
export type { SwaggerConfig };
