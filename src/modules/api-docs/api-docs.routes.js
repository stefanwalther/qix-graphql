const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const pkg = require('read-pkg-up').sync().pkg;
const fs = require('fs');
const path = require('path');

// Api-docs
const swaggerDoc = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './api-docs.yml'), 'utf8'));
swaggerDoc.info.version = pkg.version;
router.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

module.exports = router;
