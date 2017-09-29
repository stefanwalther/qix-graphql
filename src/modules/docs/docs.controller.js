const DocsBL = require('./docs.bl');

class DocsController {

  static getAll(req, res /* , next */) {

    DocsBL.getDocs()
      .then(docs => res.send(docs));

  }

}

module.exports = DocsController;
