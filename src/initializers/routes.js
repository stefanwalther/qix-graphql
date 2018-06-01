const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap

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
// Todo: localhost is hardcoded here, we have to fix that
router.use('/', (req, res) => {
  res.json({
    _links: {
      _self: 'http://localhost:3004',
      global: 'http://localhost:3004/global/graphql',
      'health-check': 'http://localhost:3004/health-check'
    }
  });
});

module.exports = {
  // After: 'passport',
  configure: app => {
    app.use(router);
  }
};
