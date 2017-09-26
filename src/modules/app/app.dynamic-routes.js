const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const AppController = require('./app.controller');

// Todo: Add a route for the root of /app to throw an error that qDocId is required
router.get('/app/xxx/', AppController.foo);

module.exports = router;


// Delete routes at runtime: https://stackoverflow.com/questions/15344628/best-way-to-do-dynamic-routing-with-express-js-node-js
// Dynamic routes: https://stackoverflow.com/questions/27302904/adding-express-routes-asynchronously

// See: https://stackoverflow.com/questions/10378690/remove-route-mappings-in-nodejs-express

// Deleting routes
// https://stackoverflow.com/questions/15487084/removing-a-specfic-mapped-route-in-node-js-at-runtime-removes-static-mapping

// app referencing:
// https://stackoverflow.com/questions/10090414/express-how-to-pass-app-instance-to-routes-from-a-different-file

// runtime route; see here first
// https://alexanderzeitler.com/articles/expressjs-dynamic-runtime-routing/
