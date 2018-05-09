class AppController {

  static getById(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.json({
      qDocId: req.params.qDocId
    });
  }
}

module.exports = AppController;
