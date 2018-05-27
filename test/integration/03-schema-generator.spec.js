const superTest = require('supertest');
const AppServer = require('./../../src/app-server');
const HttpStatusCodes = require('http-status-codes');
const ql = require('superagent-graphql');
const AppSchema = require('./../../src/modules/app/app.schema');

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
    let table_and_keys = await AppSchema.getTablesAndKeys(options);
    expect(table_and_keys).to.exist;
  });

});
