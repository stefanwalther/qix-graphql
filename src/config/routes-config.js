const express = require('express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const pkg = require('./../../package.json');
const defaultConfig = require('./../config/default-config');

const healthCheckRoutes = require('./../modules/health-check/health-check.routes.js');
const graphQLController = require('./../modules/graphql/graphql.routes');
const appRoutes = require('./../modules/app/app.routes');
const graphqlHTTP = require('express-graphql');

const graphQlSchema = require('./../modules/graphql/graphql.schema');

// Todo: Make routes dynamic, based on some pattern ... *.routes.*.js
function init(app) {
  const router = express.Router(); // eslint-disable-line new-cap

  // /health-check
  app.use('/', healthCheckRoutes);

  app.use('/', appRoutes.init(app));

  app.use('/graphiql', graphqlHTTP({
    schema: graphQlSchema,
    graphiql: true,
    context: {
      config: defaultConfig
    }
  }));

  // /graphql
  app.use('/', graphQLController);

  // /api-docs
  const swaggerDoc = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './api-docs.yml'), 'utf8'));
  swaggerDoc.info.version = pkg.version;
  app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  app.use('/', router);
}

module.exports = {
  init
};
