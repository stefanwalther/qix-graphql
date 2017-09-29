const enigma = require('enigma.js');
const WebSocket = require('ws');
const qixSchema = require('enigma.js/schemas/12.20.0.json');
const logger = require('winster').instance();

/**
 *
 * @param options
 * @param {String} options.qName - Name of the table
 */
const resolveTable = options => {
  const session = enigma.create({
    schema: qixSchema,
    url: 'ws://qix:9076/app/engineData',
    createSocket: url => new WebSocket(url)
  });

  return session.open()
    .then(global => global.openDoc({qDocName: options.qDocName, qNoData: false}))
    .then(() => {
      return [];
    })
    .catch(err => {
      logger.error('Err in getTablesAndKeys', err);
      throw err;
    }, err => {
      logger('There is another error here', err);
      throw err;
    });
};

module.exports = {
  resolveTable
};
