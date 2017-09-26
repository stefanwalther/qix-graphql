const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const AppController = require('./app.controller');

// Todo: Add a route for the root of /app to throw an error that qDocId is required
router.get('/app/:qDocId', AppController.getById);
router.get('/app/d/:qDocId', (req, res, next) => {
  console.log('req', req);
  console.log('res', res);
  console.log('next', next);

  setTimeout(() => {
    console.log('OK, generate the files');
    res.json({status: 'Generating'});
    next();
  },1000);
});

module.exports = router;
