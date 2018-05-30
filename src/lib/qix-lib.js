const enigma = require('enigma.js');
const WebSocket = require('ws');
const qixSchema = require('enigma.js/schemas/12.20.0.json');
const config = require('./../config/config');

class QixLib {

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
  }

}

module.exports = QixLib;
