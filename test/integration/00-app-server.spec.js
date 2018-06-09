const superTest = require('supertest');
const AppServer = require('./../../src/app-server');
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

  it('should be instantiated', () => {
    expect(appServer.server).to.exist;
  });

  it('should use default config', () => {
    expect(appServer.config).to.exist;
    expect(appServer.config.HOST).to.equal(config.HOST);
    expect(appServer.config.PORT).to.equal(config.PORT);
    expect(appServer.config.NODE_ENV).to.equal(config.NODE_ENV);
    expect(appServer.config.QIX_HOST).to.equal(config.QIX_HOST);
    expect(appServer.config.QIX_PORT).to.equal(config.QIX_PORT);
  });

});


