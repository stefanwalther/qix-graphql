const enigma = require('enigma.js');
const WebSocket = require('ws');
const qixSchema = require('enigma.js/schemas/12.20.0.json');
const QixGraphQlGenerator = require('./qix-graphql-generator');
const logger = require('winster').instance();

class SchemaGenerator {

  /**
   *
   * @param options
   * @param options.qDocId
   *
   * @return Promise
   */
  static generateSchema(options) {

    return SchemaGenerator.getTablesAndKeys({qDocName: options.qDocId})
      .then(tk => {
        let gen = new QixGraphQlGenerator();
        return gen.getSchema({tables_and_keys: tk});
      });
  }

  /**
   *
   * @param qDocName
   * @returns {Promise.<TResult>}
   */
  static getTablesAndKeys(options) {

    logger.verbose('getTablesAndKeys', options.qDocName);

    const session = enigma.create({
      schema: qixSchema,
      url: 'ws://localhost:9076/app/engineData',
      createSocket: url => new WebSocket(url)
    });

    return session.open()
      .then(global => global.openDoc({qDocName: options.qDocName, qNoData: false}))
      .then(doc => doc.getTablesAndKeys({qIncludeSysVars: true}))
      .catch(err => {
        logger.error('Err in getTablesAndKeys', err);
        throw err;
      }, err => {
        logger('There is another error here', err);
        throw err;
      });
  }
}

module.exports = SchemaGenerator;
