const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const graphqlHTTP = require('express-graphql');
const logger = require('winster').instance();

const defaultConfig = require('./../../config/config');
const qixResolvers = require('./../../lib/qix-graphql-schema-generator/qix-resolvers');
// Const AppController = require('./app.controller');
const AppSchema = require('./app.schema');

/**
 * Endpoint to generate a route for the given document.
 */
router.all('/app/:qDocId/graphql', (req, res, next) => {
  // Req.setTimeout(0);
  // Console.log(app._router.stack);

  logger.verbose('/app/:qDocId/graphql', req.params.qDocId);

  // Let schema = await AppSchema.generateAppSchema(req.param.qDocId);

  return AppSchema.genSchema(req.params.qDocId)
    .then(schema => {
      return graphqlHTTP({
        schema: schema,
        graphiql: true,
        context: {
          config: defaultConfig,
          qixResolvers: qixResolvers
        }
      })(req, res, next);
    })
    .catch(err => {
      res.status(404).json({error: err}).end();
    });
});

module.exports = router;
