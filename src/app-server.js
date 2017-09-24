const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const logger = require('winster').instance();
// Const graphqlHttp = require('express-graphql');

const defaultConfig = require('./config/default-config');
const routesConfig = require('./config/routes-config');

class AppServer {

  constructor() {
    this.server = null;
    this.logger = logger;
    this.config = defaultConfig;

    this._initApp();
  }

  _initApp() {
    this.app = express();
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(bodyParser.json());

    routesConfig.init(this.app);
  }

  /**
   * Start the GraphQL server.
   */
  start() {
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(this.config.PORT, err => {
        if (err) {
          this.logger.error('Cannot start express server', err);
          return reject(err);
        }
        this.logger.info(`Express server listening on port ${this.config.PORT} in "${process.env.NODE_ENV}" mode`);
        return resolve();
      });
    });
  }

  /**
   * Stop the GraphQL server.
   */
  stop() {
    return new Promise(resolve => {
      this.server.close(() => {
        this.logger.info('Server stopped');
        resolve();
      });
    });
  }
}

module.exports = AppServer;

