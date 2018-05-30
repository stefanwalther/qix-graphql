const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const graphqlHTTP = require('express-graphql');
const ExpressResult = require('express-result');

const defaultConfig = require('./../../config/config');
const qixResolvers = require('./app.resolvers');
// Const AppController = require('./app.controller');
const AppSchema = require('./app.schema');

/**
 * Endpoint to generate a route for the given document.
 */
router.all('/app/:qDocId/graphql', async (req, res) => {

  try {
    let schema = await AppSchema.generateAppSchema(req.params.qDocId);
    return graphqlHTTP({
      schema: schema,
      graphiql: true,
      context: {
        config: defaultConfig,
        qixResolvers: qixResolvers
      }
    })(req, res);
  } catch (err) {
    let e = {
      error: {
        message: `Error creating the app-schema for <${req.params.qDocId}>`,
        trace: String(err)
      }
    };
    ExpressResult.error(res, e);
  }
});

module.exports = router;
