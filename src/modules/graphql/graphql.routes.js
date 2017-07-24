const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const GraphQlController = require('./graphql.controller');

router.get('/graphql', GraphQlController.get);

module.exports = router;
