const superTest = require('supertest');
const AppServer = require('./../../src/app-server');
const HttpStatusCodes = require('http-status-codes');
const ql = require('superagent-graphql');
const config = require('./../../src/config/config');

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
    appServer = null;
  });

  it('allows to query docs', async () => {

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
        expect(result.body.errors).to.not.exist;
        expect(result).to.have.a.property('body').to.have.a.property('data');
        expect(result.body.data).to.have.a.property('docs').to.be.an('array');
      })
  });

  it('allows to query a single doc', async () => {

    const query = `{
                    doc(qDocId: "/docs/CRM.qvf") {
                      qDocName
                    }
                  }`;
    const vars = {};

    await server
      .post('/global/graphql')
      .use(ql(query, vars))
      .expect(HttpStatusCodes.OK)
      .then(result => {
        expect(result).to.exist;
        expect(result.body.errors).to.not.exist;
        expect(result).to.have.a.property('body').to.have.a.property('data');
        expect(result.body.data).to.have.a.property('doc').to.have.a.property('qDocName').to.equal('CRM.qvf')
      })
  });

  it('provides to query the env', async () => {
    const query = `{
                    env {
                      HOST
                      PORT
                      QIX_HOST
                      QIX_PORT
                      
                    }
                  }`;
    const vars = {};

    await server
      .post('/global/graphql')
      .use(ql(query, vars))
      .expect(HttpStatusCodes.OK)
      .then(result => {
        expect(result).to.exist;
        expect(result.body.errors).to.not.exist;
        expect(result).to.have.a.property('body').to.have.a.property('data').to.have.a.property('env');
        expect(result.body.data.env).to.have.a.property('HOST').to.equal(config.HOST);
        expect(result.body.data.env).to.have.a.property('PORT').to.equal(config.PORT);
        expect(result.body.data.env).to.have.a.property('QIX_HOST').to.equal(config.QIX_HOST);
        expect(result.body.data.env).to.have.a.property('QIX_PORT').to.equal(config.QIX_PORT);
      })
  })

});
