const AppSchemaGenerator = require('./app-schema-generator');
const QixLib = require('./../../lib/qix-lib');

// Todo: to be replaced with the schemaCache ...
// let schemas = {};

class AppSchema {

  static async generateAppSchema(qDocId) {

    let tk = await QixLib.getTablesAndKeys({qDocName: qDocId});
    let generator = new AppSchemaGenerator({
      qDocId: qDocId,
      tables_and_keys: tk
    });
    return generator.getSchema();
  }

  // -------------------------------------------------------------------------------------------------------------------

  // Todo: Old implementation using the cache
  // static async genSchema(qDocId) {
  //   return new Promise((resolve, reject) => {
  //     if (schemas[qDocId]) {
  //       logger.verbose('Returning schema from cache', qDocId);
  //       return resolve(schemas[qDocId]);
  //     }
  //     logger.verbose('Creating schema: ', qDocId);
  //     SchemaGenerator.generateSchema({qDocId})
  //       .then(schema => {
  //         logger.verbose('==> OK, we got a schema');
  //         schemas[qDocId] = schema;
  //         resolve(schema);
  //       })
  //       .catch(err => {
  //         logger.error('We have an error creating the schema', err);
  //         reject(err);
  //       });
  //   });
  //
  // }

}

module.exports = AppSchema;
