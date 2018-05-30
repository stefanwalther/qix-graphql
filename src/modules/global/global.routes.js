const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const graphqlHTTP = require('express-graphql');

const graphQlSchema = require('./global.schema');
const defaultConfig = require('./../../config/config');

router.use('/global/graphql', graphqlHTTP({
  schema: graphQlSchema,
  graphiql: true,
  context: {
    config: defaultConfig
  }
}));

module.exports = router;
