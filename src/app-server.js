const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const logger = require('winster').instance();

const defaultConfig = require('./config/default-config');
const routesConfig = require('./config/routes-config');

class AppServer {

  constructor() {
    this.server = null;
    this.logger = logger;
    this.config = defaultConfig;

    this._initApp();
  }

  /**
   * Initialize the the express app.
   *
   * @private
   */
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
  async start() {

    try {
      this.server = this.app.listen(this.config.PORT);
      this.logger.info(`Express server listening on port ${this.config.PORT} in "${this.config.NODE_ENV}" mode`);
    } catch (e) {
      this.logger.error('Cannot start express server', e);
    }
  }

  /**
   * Stop the GraphQL server.
   */
  async stop() {
    await this.server.close();
    this.logger.info('Server stopped');
  }
}

module.exports = AppServer;

