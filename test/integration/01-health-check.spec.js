const superTest = require('supertest');
const HttpStatus = require('http-status-codes');
const AppServer = require('./../../src/app-server');

const pkg = require('./../../package.json');

describe('INTEGRATION => health-check', () => {

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

  it('returns OK and a timestamp', async () => {
    await server
      .get('/health-check')
      .expect(HttpStatus.OK)
      .then(result => {
        expect(result).to.exist;
        expect(result).to.have.property('body');
        expect(result.body).to.have.property('ts').to.exist;
        expect(result.body).to.have.property('version').to.be.equal(pkg.version);
        expect(result.body).to.have.property('name').to.be.equal(pkg.name);
      });
  });
});
