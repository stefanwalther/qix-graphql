class GraphQLController {

  static get(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
      what: 'GraphQL',
      ts: new Date().toJSON()
    });
    next();
  }

}

module.exports = GraphQLController;
