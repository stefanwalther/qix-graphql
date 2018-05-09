const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const HealthCheckController = require('./health-check.controller.js');

/**
 * @swagger
 *
 * definitions:
 *   HealthCheckResult:
 *     type: object
 *     properties:
 *       ts:
 *         type: string
 *         format: date-time
 *         description: Timestamp of the returned health-check result.
 *         example: "2018-03-24T23:05:28.341Z"
 *       name:
 *         type: string
 *         description: "The name of the service."
 *         example: "auth-service"
 *       repository:
 *         type: object
 *         properties:
 *           type:
 *             type: string
 *             example: "git"
 *           url:
 *             type: string
 *             example: "https://github.com/sammler/auth-service"
 *       version:
 *         type: string
 *         description: "The current version of the service."
 *         example: "0.1.0"
 *
 *
 * /health-check:
 *   get:
 *     description: Get the status of the auth-server.
 *     security: []
 *     produces:
 *       - application/json
 *     tags:
 *       - health-check
 *     responses:
 *       200:
 *         description: Returned health-check status.
 *         schema:
 *           $ref: '#/definitions/HealthCheckResult'
 */
router.get('/health-check', HealthCheckController.get);

module.exports = router;
