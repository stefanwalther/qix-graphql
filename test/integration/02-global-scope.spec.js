const superTest = require('supertest');
const AppServer = require('./../../src/app-server');
const HttpStatusCodes = require('http-status-codes');
const ql = require('superagent-graphql');

describe('INTEGRATION => global scope ', () => {

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

  xit('allows to query docs', async () => {

    const query = `{
                     docs {
                       qDocName
                       qDocId
                      }
                    }`;
    const vars = {};

    await server
      .post('/global/graphql')
      .use(ql(query, vars))
      .expect(HttpStatusCodes.OK)
      .then(result => {
        expect(result).to.exist;
        expect(result).to.have.a.property('body').to.have.a.property('data');
        expect(result.body.data).to.have.a.property('docs').to.be.an('array');
      })
  });

});
