const logger = require('winster').instance();
const SchemaGenerator = require('./../../lib/qix-graphql-schema-generator/schema-generator');

// Todo: to be replaced with the schemaCache ...
let schemas = {};

class AppSchema {

  static genSchema(qDocId) {
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

  }

}

module.export = AppSchema;
