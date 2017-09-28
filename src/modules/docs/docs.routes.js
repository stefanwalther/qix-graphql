const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const DocsController = require('./docs.controller');

// Todo: Should be removed (apps/docs) !
router.get('/apps', DocsController.getAll);

module.exports = router;
