const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const HealthCheckController = require('./health-check.controller.js');

/**
 * @swagger
 * /health-check:
 *   get:
 *     description: Get the service' status.
 *     produces:
 *        - application/json
 *     responses:
 *       200:
 *         description: Returned health-check status.
 */
router.get('/health-check', HealthCheckController.get);

module.exports = router;
