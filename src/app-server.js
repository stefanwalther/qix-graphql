const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const initializer = require('express-initializers');
const logger = require('winster').instance();
const path = require('path');
const _ = require('lodash');

const config = require('./config/config');

class AppServer {

  constructor(opts = {}) {
    this.server = null;
    this.logger = logger;
    this.config = _.extend(_.clone(config), opts);

    this.app = express();
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(bodyParser.json());
  }

  /**
   * Start the GraphQL server.
   */
  async start() {

    await initializer(this.app, {directory: path.join(__dirname, 'initializers')});

    this.server = this.app.listen(this.config.PORT);
    this.logger.info(`Express server listening on port ${this.config.PORT} in "${this.config.NODE_ENV}" mode`);
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

