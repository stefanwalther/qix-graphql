const superTest = require('supertest');
const HttpStatus = require('http-status-codes');
const AppServer = require('./../../src/app-server');

const pkg = require('./../../package.json');

describe('INTEGRATION => health-check', () => {

  let server;
  const appServer = new AppServer();
  before(() => {
    return appServer.start()
      .then(() => {
        server = superTest(appServer.Server);
      });
  });

  after(() => {
    return appServer.stop();
  });

  it('returns OK and a timestamp', () => {
    return server
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
