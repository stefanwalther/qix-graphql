const enigma = require('enigma.js');
const WebSocket = require('ws');
const schema = require('enigma.js/schemas/12.20.0.json');
const defaultConfig = require('./../../config/default-config');

class DocsBL {

  static getDocs() {

    let retVal = null;
    const session = enigma.create({
      schema,
      // Todo: Make this configurable ...
      url: `ws://${defaultConfig.QIX_HOST}:9076`,
      createSocket: url => new WebSocket(url)
    });

    return session.open()
      .then(global => {
        return global.getDocList()
          .then(docs => {
            retVal = docs;
          });
      })
      .then(() => session.close())
      .then(() => {
        return retVal;
      });
  }

  static getDoc(qDocId) {
    return DocsBL.getDocs()
      .then(docs => {
        return docs.filter(doc => doc.qDocId === qDocId)[0];
      });
  }
}

module.exports = DocsBL;
