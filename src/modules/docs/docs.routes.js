const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const DocsController = require('./docs.controller.js');

router.get('/docs', DocsController.get);

module.exports = router;
