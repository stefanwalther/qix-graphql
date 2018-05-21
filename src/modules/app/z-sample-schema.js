
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Todo: The entire file can probably be removed; used for prototyping purposes ...
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const logger = require('winster').instance();
const SchemaGenerator = require('./../../lib/qix-graphql-schema-generator/schema-generator');

let schemas = {};

// Todo: This is where we could introduce a cache which can scale out, e.g. Redis
const genSchema = qDocId => {
  return new Promise((resolve, reject) => {
    if (schemas[qDocId]) {
      logger.verbose('Returning schema from cache', qDocId);
      return resolve(schemas[qDocId]);
    }
    logger.verbose('Creating schema: ', qDocId);
    SchemaGenerator.generateSchema({qDocId})
      .then(schema => {
        logger.verbose('==> OK, we got a schema');
        schemas[qDocId] = schema;
        resolve(schema);
      })
      .catch(err => {
        logger.error('We have an error creating the schema', err);
        reject(err);
      });
  });
};

module.exports = {
  genSchema
};
