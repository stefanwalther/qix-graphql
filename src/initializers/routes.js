const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const config = require('./../config/config');

// API Docs
// Todo: Just crap for now
// router.use('/', require('./../modules/api-docs/api-docs.routes'));

// Health-check
router.use('/', require('./../modules/health-check/health-check.routes.js'));

// Global
router.use('/', require('./../modules/global/global.routes'));

// Router.use('/doc/:id', );
router.use('/', require('./../modules/doc/doc.routes'));

// Fallback / root
router.use('/', (req, res) => {
  res.json({
    _links: {
      _self: `http://${config.HOST}:${config.PORT}`,
      global: `http://${config.HOST}:${config.PORT}/global/graphql`,
      'health-check': `http://${config.HOST}:${config.PORT}/health-check`
    }
  });
});

module.exports = {
  // After: 'passport',
  configure: app => {
    app.use(router);
  }
};
