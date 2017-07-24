const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const DocsController = require('./docs.controller');

router.get('/docs', DocsController.get);

module.exports = router;
