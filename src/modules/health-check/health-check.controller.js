const pkg = require('./../../../package.json');

class HealthController {

  static get(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
      ts: new Date().toJSON(),
      version: pkg.version,
      name: pkg.name
    });
  }
}

module.exports = HealthController;
