const superTest = require('supertest');
const AppServer = require('./../../src/app-server');
const HttpStatus = require('http-status-codes');
const config = require('./../../src/config/config');

describe('INTEGRATION => appServer', () => {

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

  it('should have a nice fallback route', async () => {

    await server
      .get('/foo')
      .expect(HttpStatus.OK)
      .then(result => {
        console.log(result.body);
        expect(result.body).to.have.property('_links');
        expect(result.body._links).to.have.property('_self').to.be.equal(`http://${config.HOST}:${config.PORT}`)
      })
  });
});
