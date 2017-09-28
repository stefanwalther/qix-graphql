const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const AppController = require('./app.controller');
const graphqlHTTP = require('express-graphql');

const mockSchemas = require('./sample-schema');

function init(app) {
  // Todo: Add a route for the root of /app to throw an error that qDocId is required
  router.get('/app/:qDocId', AppController.getById);

  /**
   * Endpoint to generate a route for the given document.
   */
  router.all('/app/:qDocId/graphiql', (req, res, next) => {
    req.setTimeout(0);
    // console.log(app._router.stack);

    if (req.params.qDocId === 'schema1') {
      console.log('qDocId', req.params.qDocId);
      return graphqlHTTP({
        schema: mockSchemas.schema1,
        graphiql: true
      })(req, res, next);
    } else if (req.params.qDocId === 'schema2') {
      console.log('qDocId', req.params.qDocId);
      return graphqlHTTP({
        schema: mockSchemas.schema2,
        graphiql: true
      })(req, res, next);
    } else {
      setTimeout(() => {
        res.json({status: 'Generating'});
        res.end();
        next();
      }, 1000);
    }
  });

  return router;
}

module.exports = {
  init
};
