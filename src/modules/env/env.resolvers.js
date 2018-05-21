const enigma = require('enigma.js');
const WebSocket = require('ws');
const schema = require('enigma.js/schemas/12.20.0.json');
const config = require('./../../config/config'); // Todo: we ignore the context here!?!?!

class EnvResolvers {
  static getDocs() {

    let retVal = null;
    const session = enigma.create({
      schema,
      // Todo: Make this configurable ...
      url: `ws://${config.QIX_HOST}:${config.QIX_PORT}`,
      createSocket: url => new WebSocket(url)
    });

    return session.open()
      .then(global => {
        return global.getDocList()
          .then(docs => {
            docs.map(doc => { // eslint-disable-line array-callback-return
              doc._links = {
                _doc: `http://${config.HOST}:${config.PORT}/app/${encodeURIComponent(doc.qDocId)}/graphiql`
              };
            });
            retVal = docs;
          });
      })
      .then(() => session.close())
      .then(() => {
        return retVal;
      });
  }

  static getDoc(qDocId) {
    return EnvResolvers.getDocs()
      .then(docs => {
        return docs.filter(doc => doc.qDocId === qDocId)[0];
      });
  }
}

module.exports = EnvResolvers;
