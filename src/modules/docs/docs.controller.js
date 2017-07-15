
class HealthController {

  static get(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
      ts: new Date().toJSON()
    });
    next();
  }

}

module.exports = HealthController;
