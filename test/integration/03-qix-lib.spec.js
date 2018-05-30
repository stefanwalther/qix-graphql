const superTest = require('supertest');
const AppServer = require('./../../src/app-server');
const QixLib = require('./../../src/lib/qix-lib');

describe('Schema generator ', () => {

  let server;
  let appServer;

  beforeEach(async () => {
    appServer = new AppServer();
    await appServer.start();
    server = superTest(appServer.server);
  });

  afterEach(async () => {
    await appServer.stop();
  });

  it('fetches tables_and_keys (for /docs/CRM.qvf)', async() => {
    const options = {
      "qDocName": "/docs/CRM.qvf"
    };
    let table_and_keys = await QixLib.getTablesAndKeys(options);
    expect(table_and_keys).to.exist;
  });

});
