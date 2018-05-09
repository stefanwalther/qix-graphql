const enigma = require('enigma.js');
const WebSocket = require('ws');
const qixSchema = require('enigma.js/schemas/12.20.0.json');
const logger = require('winster').instance();

// Todo: We should add better validation for the given context ...
/**
 *
 * @param ctx
 * @param {String} ctx.qName - Name of the table
 */
const resolveTable = (tableName, fields, ctx) => {

  // Todo(AAA): All hardcoded values, need to be fixed
  let docToOpen = '/docs/CRM.qvf';

  // Todo(AAA): we should be able to pass in an existing connection
  const session = enigma.create({
    schema: qixSchema,
    url: `ws://${ctx.config.QIX_HOST}:${ctx.config.QIX_PORT}/app/engineData`,
    createSocket: url => new WebSocket(url)
  });

  return session.open()
    .then(global => global.openDoc({qDocName: docToOpen, qNoData: false}))
    .then(doc => {
      console.log('doc', doc);
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
      logger('There is another error here', err);
      throw err;
    });
};

const outputOptions = ctx => {
  logger.verbose('qixResolvers.outputOptions');
  logger.verbose('==> ctx.config', ctx.config);
  return null;
};

module.exports = {
  outputOptions,
  resolveTable
};
