const superTest = require('supertest');
const HttpStatus = require('http-status-codes');
const AppServer = require('./../../src/app-server');

describe('Integration tests: In ENV mode', () => {

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

  xit('exposes the /env/graphiql endpoint', async () => {
    await server
      .post('/env/graphql')
      .send({query: `
          docs {
         `})
      .then(result => {
        console.log(result.body);
      })
  });

});
