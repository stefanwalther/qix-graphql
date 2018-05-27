const logger = require('winster').instance();
const SchemaGenerator = require('./../../lib/qix-graphql-schema-generator/schema-generator');
const enigma = require('enigma.js');
const WebSocket = require('ws');
const qixSchema = require('enigma.js/schemas/12.20.0.json');

const QixGraphQlGenerator = require('./../../lib/qix-graphql-schema-generator/qix-graphql-generator');

const config = require('./../../config/config');

// Todo: to be replaced with the schemaCache ...
let schemas = {};

class AppSchema {

  static async generateAppSchema(qDocId) {

    let tk = await AppSchema.getTablesAndKeys({qDocName: qDocId});
    let generator = new QixGraphQlGenerator({
      qDocId: qDocId,
      tables_and_keys: tk
    });
    return generator.getSchema();
  }

  // Todo: to be replaced by generateAppSchema
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

  /**
   * Get TablesAndKeys from the QIX engine.
   *
   * @param options
   * @param options.qDocName
   *
   * @returns {Promise.<TResult>}
   */
  static async getTablesAndKeys(options) {

    const session = enigma.create({
      schema: qixSchema,
      url: `ws://${config.QIX_HOST}:${config.QIX_PORT}/app/engineData`,
      createSocket: url => new WebSocket(url)
    });

    let global = await session.open();
    let doc = await global.openDoc({qDocName: options.qDocName, qNoData: false});
    let table_and_keys = await doc.getTablesAndKeys({qIncludeSysVars: true});

    await session.close();
    return table_and_keys;

    // Todo: To be deleted; take care of the error-handling, though!
    // return session.open()
    //   .then(global => global.openDoc({qDocName: options.qDocName, qNoData: false}))
    //   .then(doc => doc.getTablesAndKeys({qIncludeSysVars: true}))
    //   .then(table_and_keys => {
    //     return session.close()
    //       .then(() => {
    //         return Promise.resolve(table_and_keys);
    //       });
    //   })
    //   .catch(err => {
    //     logger.error('Err in getTablesAndKeys', err);
    //     throw err;
    //   }, err => {
    //     logger('There is another error here', err);
    //     throw err;
    //   })
    //   // Todo: Has to be tested, when and how to keep/close sessions ...
    //   .then(() => session.close());
  }

}

module.exports = AppSchema;
