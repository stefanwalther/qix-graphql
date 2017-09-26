const superTest = require('supertest');
const HttpStatus = require('http-status-codes');
const AppServer = require('./../../src/app-server');

describe('INTEGRATION => appServer', () => {

  let server = null;
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

  it('should be running', () => {
    expect(appServer.Server).to.exist;
  });

});
