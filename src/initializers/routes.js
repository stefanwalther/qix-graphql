const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router(); // eslint-disable-line new-cap
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const pkg = require('read-pkg-up').sync().pkg;
const graphqlHTTP = require('express-graphql');

const graphQlSchema = require('./../modules/env/env.schema');
const healthCheckRoutes = require('./../modules/health-check/health-check.routes.js');
const defaultConfig = require('./../config/config');

const appRoutes = require('./../modules/app/app.routes');

// Api-docs
const swaggerDoc = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './../modules/api-docs/api-docs.yml'), 'utf8'));
swaggerDoc.info.version = pkg.version;
router.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Health-check
router.use('/', healthCheckRoutes);

// Env graphql
router.use('/env/graphql', graphqlHTTP({
  schema: graphQlSchema,
  graphiql: true,
  context: {
    config: defaultConfig
  }
}));

// Router.use('/app/:id', );
router.use('/app', appRoutes);

// Fallback / root
router.use('/', (req, res) => {
  res.json({
    _links: {
      _self: 'http://localhost:3004',
      'api-docs': 'http://localhost:3004/api-docs',
      env: 'http://localhost:3004/env/graphql',
      'health-check': 'http://localhost:3004/health-check'
    }
  });
});

module.exports = {
  // After: 'passport',
  configure: app => {
    app.use(router);
  }
};
