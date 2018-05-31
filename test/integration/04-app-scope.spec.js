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

  it('allows to fetch data from an app (CRM.qvf)', async() => {

    const query = `{
                    account {
                      AccountId
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
        expect(result.body.data).to.have.a.property('account').to.be.an('array').of.length.greaterThan(9);
        expect(result.body.data.account[0]).to.have.a.property('AccountId');
      })

  });

  it('returns an error if the app-schema cannot be created', async () => {

    const query = `{
                    table_does_not_exist {
                      field_does_not_exist
                    }
                  }`;
    const vars = {};

    await server
      .post('/app/%2Fdocs%2FCRM.qvf/graphql')
      .use(ql(query, vars))
      .expect(HttpStatusCodes.BAD_REQUEST)
      .then(result => {
        console.log(result.body.errors);
        expect(result).to.exist;
        expect(result.body.errors[0]).to.deep.contain({'message': 'Cannot query field "table_does_not_exist" on type "Tables".'});
      })

  });

});
