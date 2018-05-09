const enigma = require('enigma.js');
const WebSocket = require('ws');
const qixSchema = require('enigma.js/schemas/12.20.0.json');
const QixGraphQlGenerator = require('./qix-graphql-generator');
const logger = require('winster').instance();
const config = require('./../../config/default-config');

class SchemaGenerator {

  /**
   *
   * @param options
   * @param {String} options.qDocId - The document Id.
   *
   * @return Promise
   */
  static generateSchema(options) {

    return SchemaGenerator.getTablesAndKeys({qDocName: options.qDocId})
      .then(tk => {
        let gen = new QixGraphQlGenerator({
          qDocId: options.qDocId,
          tables_and_keys: tk
        });
        return gen.getSchema();
      })
      .catch(err => {
        throw err;
      });
  }

  /**
   * Get TablesAndKeys from the QIX engine.
   *
   * @param options
   * @param options.qDocName
   * @returns {Promise.<TResult>}
   */
  static getTablesAndKeys(options) {

    logger.verbose('getTablesAndKeys', options.qDocName);

    // Todo: We have to pass the connection string from outside!
    const session = enigma.create({
      schema: qixSchema,
      url: `ws://${config.QIX_HOST}:${config.QIX_PORT}/app/engineData`,
      createSocket: url => new WebSocket(url)
    });

    return session.open()
      .then(global => global.openDoc({qDocName: options.qDocName, qNoData: false}))
      .then(doc => doc.getTablesAndKeys({qIncludeSysVars: true}))
      .then(table_and_keys => {
        return session.close()
          .then(() => {
            return Promise.resolve(table_and_keys);
          });
      })
      .catch(err => {
        logger.error('Err in getTablesAndKeys', err);
        throw err;
      }, err => {
        logger('There is another error here', err);
        throw err;
      });
    // .then(() => session.close());
  }
}

module.exports = SchemaGenerator;
