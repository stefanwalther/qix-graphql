const enigma = require('enigma.js');
const WebSocket = require('ws');
// Todo: verify the schema, or probably even better: make this a global config
const qixSchema = require('enigma.js/schemas/12.20.0.json');

const config = require('./../../src/config/config');

xdescribe('INTEGRATION => enigma.js tests ==>', () => {

  describe('SESSION', () => {

    let session = null;

    beforeEach(() => {
      session = enigma.create({
        schema: qixSchema,
        url: `ws://${config.QIX_HOST}:${config.QIX_PORT}/app/engineData`,
        createSocket: url => new WebSocket(url)
      });
    });

    afterEach(async () => {
      if (session) {
        await session.close();
      }
    });

    it('open a session', () => {
      //session.on('opened', data => console.log('session opened'));
      //session.on('closed', data => console.log('session closed'));
      //session.on('traffic:sent', data => console.log('sent:', data));
      //session.on('traffic:received', data => console.log('received:', data));

      return session.open()
        .then(global => {
          expect(global).to.exist;
        });
    });
  });

  describe('DOC', () => {
    let session = null;

    beforeEach(() => {
      session = enigma.create({
        schema: qixSchema,
        url: `ws://${config.QIX_HOST}:${config.QIX_PORT}/app/engineData`,
        createSocket: url => new WebSocket(url)
      });
    });

    afterEach(async () => {
      if (session) {
        await session.close();
      }
    });

    it('open a doc', () => {

      return session.open()
        // Todo (AAA): Replace hardcoded value and make this dynamic
        .then(global => global.openDoc({qDocName: '/docs/CRM.qvf', qNoData: false}))
        .then(doc => doc.getTablesAndKeys({qIncludeSysVars: true}))
        .catch(err => {
          console.error('Err in getTablesAndKeys', err);
          throw err;
        }, err => {
          console.log('There is another error here', err);
          throw err;
        });

    });
  });
});
