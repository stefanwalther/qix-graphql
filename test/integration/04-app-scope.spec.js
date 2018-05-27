const superTest = require('supertest');
const AppServer = require('./../../src/app-server');
const HttpStatusCodes = require('http-status-codes');
const ql = require('superagent-graphql');

describe('Integration tests: In APP mode', () => {

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

  xit('allows to fetch data from an app (CRM.qvf)', async() => {

    const query = `{
                     docs {
                       qDocName
                       qDocId
                      }
                    }`;
    const vars = {};

    await server
      .post('/app/%2Fdocs%2FCRM.qvf/graphql')
      .use(ql(query, vars))
      .expect(HttpStatusCodes.OK)
      .then(result => {
        expect(result).to.exist;
        expect(result.body.errors).to.not.exist;
        expect(result).to.have.a.property('body').to.have.a.property('data');
        expect(result.body.data).to.have.a.property('docs').to.be.an('array');
      })

  });

});
