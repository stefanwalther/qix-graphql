const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const graphqlHTTP = require('express-graphql');

const defaultConfig = require('./../../config/config');
const docResolvers = require('./doc.resolvers');
// Const AppController = require('./app.controller');
const DocSchema = require('./doc.schema');

/**
 * Endpoint to generate a route for the given document.
 */
router.all('/doc/:qDocId/graphql', async (req, res) => {

  let schema = await DocSchema.generateDocSchema(req.params.qDocId);
  return graphqlHTTP({
    schema: schema,
    graphiql: true,
    context: {
      config: defaultConfig,
      qixResolvers: docResolvers
    }
  })(req, res);
});

module.exports = router;
