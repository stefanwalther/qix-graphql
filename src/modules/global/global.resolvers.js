const enigma = require('enigma.js');
const WebSocket = require('ws');
const schema = require('enigma.js/schemas/12.20.0.json');
const config = require('./../../config/config'); // Todo: we ignore the context here!?!?!
const _ = require('lodash');

class Resolvers {

  /**
   * Return a list of documents.
   *
   * @returns {Promise<*>}
   */
  static async getDocs() {

    let retVal;
    const session = enigma.create({
      schema,
      url: `ws://${config.QIX_HOST}:${config.QIX_PORT}`,
      createSocket: url => new WebSocket(url)
    });

    let global = await session.open();
    let docs = await global.getDocList();

    docs.map(doc => { // eslint-disable-line array-callback-return
      doc._links = {
        _doc: `http://${config.HOST}:${config.PORT}/doc/${encodeURIComponent(doc.qDocId)}/graphql`
      };
    });
    retVal = docs;
    await session.close();
    return retVal;
  }

  /**
   * Return a single document.
   *
   * @param qDocId
   * @returns {Promise<*>}
   */
  static async getDoc(qDocId) {
    let docs = await Resolvers.getDocs();
    return docs.filter(doc => doc.qDocId === qDocId)[0];
  }

  static async getEnv() {
    const e = {
      HOST: config.HOST,
      PORT: _.parseInt(config.PORT),
      QIX_HOST: config.QIX_HOST,
      QIX_PORT: _.parseInt(config.QIX_PORT)
    };
    return e;
  }

}

module.exports = Resolvers;
