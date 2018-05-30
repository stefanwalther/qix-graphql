const enigma = require('enigma.js');
const WebSocket = require('ws');
const schema = require('enigma.js/schemas/12.20.0.json');
const config = require('./../../config/config'); // Todo: we ignore the context here!?!?!

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
        _doc: `http://${config.HOST}:${config.PORT}/app/${encodeURIComponent(doc.qDocId)}/graphql`
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
  static getDoc(qDocId) {
    return Resolvers.getDocs()
      .then(docs => {
        return docs.filter(doc => doc.qDocId === qDocId)[0];
      });
  }
}

module.exports = Resolvers;
