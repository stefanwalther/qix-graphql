const AppServer = require('./../../src/app-server');
const config = require('./../../src/config/config');

describe('INTEGRATION => appServer', () => {

  let appServer;
  const customConfig = {
    QIX_HOST: 'qix-local',
    QIX_PORT: 5555
  };

  beforeEach(async () => {
    appServer = new AppServer(customConfig);
  });

  afterEach(async () => {
    await appServer.stop();
  });

  it('allows to pass custom config to the constructor', async () => {

    await appServer.start();

    // custom configs
    expect(appServer.config.QIX_HOST).to.equal(customConfig.QIX_HOST);
    expect(appServer.config.QIX_PORT).to.equal(customConfig.QIX_PORT);

    // default configs
    expect(appServer.config.PORT).to.equal(config.PORT);
    expect(appServer.config.NODE_ENV).to.equal(config.NODE_ENV);
  });
});
