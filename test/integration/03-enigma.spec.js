const superTest = require('supertest');
const HttpStatus = require('http-status-codes');
const AppServer = require('./../../src/app-server');

const enigma = require('enigma.js');
const WebSocket = require('ws');
const qixSchema = require('enigma.js/schemas/12.20.0.json');

const config = require('./../../src/config/default-config');

describe('INTEGRATION => enigma.js tests', () => {

  // let server = null;
  // const appServer = new AppServer();

  before(() => {
    // return appServer.start()
    //   .then(() => {
    //     server = superTest(appServer.server);
    //   });
  });

  after(() => {
    // return appServer.stop();
  });

  describe('SESSION', () => {

    let session = null;
    before(() => {
      session = enigma.create({
        schema: qixSchema,
        url: `ws://${config.QIX_HOST}:${config.QIX_PORT}/app/engineData`,
        createSocket: url => new WebSocket(url)
      });
    });
    after(() => {
      return session.close();
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
    before(() => {
      session = enigma.create({
        schema: qixSchema,
        url: `ws://${config.QIX_HOST}:${config.QIX_PORT}/app/engineData`,
        createSocket: url => new WebSocket(url)
      });
    });
    after(() => {
      return session.close();
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
