const enigma = require('enigma.js');
const WebSocket = require('ws');
const qixSchema = require('enigma.js/schemas/12.20.0.json');
const logger = require('winster').instance();

/**
 *
 * @param ctx
 * @param {String} ctx.qName - Name of the table
 */
const resolveTable = ctx => {

  let docToOpen = '/docs/CRM.qvf';
  let tableName = 'account';

  const session = enigma.create({
    schema: qixSchema,
    url: `ws://${ctx.config.QIX_HOST}:9076/app/engineData`,
    createSocket: url => new WebSocket(url)
  });

  return session.open()
    .then(global => global.openDoc({qDocName: docToOpen, qNoData: false}))
    .then(doc => {
      console.log('doc', doc);
      return doc.getTableData({
        qOffset: 0,
        qRows: 100,
        qSyntheticMode: false,
        qTableName: tableName
        })
        .then(td => {
          console.log('table data', td);
          return [];
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
