const enigma = require('../../../node_modules/enigma.js/enigma');
const WebSocket = require('ws');
// Todo: check the version of the schema we should use with the given version of the QIX engine
const qixSchema = require('enigma.js/schemas/12.20.0.json');
const logger = require('winster').instance();

// Todo: We should add better validation for the given context ...
/**
 * Resolver for getting the table data.
 *
 * @param tableName
 * @param fields
 * @param {Object} ctx - The context.
 * @return {Promise<T> | *}
 */
const resolveTable = (docId, tableName, fields, ctx) => {

  let docToOpen = docId;

  // Todo(AAA): we should be able to pass in an existing connection
  const session = enigma.create({
    schema: qixSchema,
    url: `ws://${ctx.config.QIX_HOST}:${ctx.config.QIX_PORT}/app/engineData`,
    createSocket: url => new WebSocket(url)
  });

  // Todo(AAA): We are not closing the session here
  return session.open()
    .then(global => global.openDoc({qDocName: docToOpen, qNoData: false}))
    .then(doc => {
      // Console.log('doc', doc);

      // Todo: Paging needs to be implemented here
      return doc.getTableData({
        qOffset: 0,
        qRows: 10,
        qSyntheticMode: false,
        qTableName: tableName
      })
        .then(qResult => {

          let result = [];

          qResult.forEach(qResultRow => {
            let resultRow = {};
            qResultRow.qValue.forEach((qResultField, qResultFieldIndex) => {

              resultRow[fields[qResultFieldIndex]] = qResultField.qText;

            });
            result.push(resultRow);
          });

          return result;
        })
        .catch(err => {
          console.log('err in getTableData', err);
        });
    })
    .catch(err => {
      logger.error('Err in getTablesAndKeys', err);
      throw err;
    }, err => {
      logger.error('There is another error here', err);
      throw err;
    });
};

const resolveDummy = (/* ctx */) => {
  return 'foo';
};

/* istanbul ignore next */
const outputOptions = ctx => {
  logger.verbose('qixResolvers.outputOptions');
  logger.verbose('==> ctx.config', ctx.config);
  return null;
};

module.exports = {
  outputOptions,
  resolveTable,
  resolveDummy
};
