const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const AppController = require('./app.controller');
const graphqlHTTP = require('express-graphql');
const logger = require('winster').instance();
const defaultConfig = require('./../../config/default-config');

const mockSchemas = require('./sample-schema');

// Test with: documents%2FConsumer%20Goods%20Example.qvf
function init(app) {
  // Todo: Add a route for the root of /app to throw an error that qDocId is required

  router.get('/app/:qDocId', AppController.getById);

  /**
   * Endpoint to generate a route for the given document.
   */
  router.all('/app/:qDocId/graphiql', (req, res, next) => {
    req.setTimeout(0);
    // console.log(app._router.stack);

    logger.verbose('/app/:qDocId/graphiql', req.params.qDocId);

    return mockSchemas.genSchema(req.params.qDocId)
      .then(schema => {
        return graphqlHTTP({
          schema: schema,
          graphiql: true,
          context: {
            config: defaultConfig
          }
        })(req, res, next);
      })
      .catch(err => {
        // Todo: Introduce ResResult
        res.status(404);
        res.json({error: err});
        res.end();
        next();
      });
  });

  return router;
}

module.exports = {
  init
};
