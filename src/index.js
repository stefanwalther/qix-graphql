const AppServer = require('./app-server');

(async () => {
  let appServer = new AppServer();
  await appServer.start();
})();
