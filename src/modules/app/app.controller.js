class AppController {

  static foo(req, res) {
    res.json({foo: 'bar'});
  }

  static getById(req, res, next) {

    console.log('app', global.app);

    res.setHeader('Content-Type', 'application/json');
    res.json({
      qDocId: req.params.qDocId
    });
    next();
  }
}

module.exports = AppController;
