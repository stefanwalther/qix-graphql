const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const graphqlHTTP = require('express-graphql');
const logger = require('winster').instance();

const defaultConfig = require('./../../config/config');
const qixResolvers = require('./../../lib/qix-graphql-schema-generator/qix-resolvers');
const AppController = require('./app.controller');
const AppSchema = require('./app.schema');
// Const mockSchemas = require('./z-sample-schema'); // Todo (AAA): To be removed

// Todo: Add a route for the root of /app to throw an error that qDocId is required
router.get('/:qDocId', AppController.getById);

/**
 * Endpoint to generate a route for the given document.
 */
router.all('/:qDocId/graphiql', (req, res, next) => {
  req.setTimeout(0);
  // Console.log(app._router.stack);

  logger.verbose('/app/:qDocId/graphiql', req.params.qDocId);

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
      next();
    });
});

module.exports = router;
