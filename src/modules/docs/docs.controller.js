const enigma = require('enigma.js');
const WebSocket = require('ws');
const schema = require('enigma.js/schemas/12.20.0.json');

class DocsController {

  static get(req, res, next) {

    console.log('/docs');
    const session = enigma.create({
      schema,
      url: 'ws://qix:9076',
      createSocket: url => new WebSocket(url)
    });

    // Bind traffic events to log what is sent and received on the socket:
    session.on('traffic:sent', data => console.log('sent:', data));
    session.on('traffic:received', data => console.log('received:', data));

    session.open()
      .then(global => {
        console.log('we are connected');
        return global.getDocList()
          .then(docs => {
            console.log('--');
            console.log('docs', docs);
            console.log('--');
            res.send(docs);
            next();
          })
          .catch(err => {
            console.log('err', err);
          });
      })
      .then(() => session.close())
      .then(() => console.log('session closed'))
      .catch(err => console.log(err));
  }

}

module.exports = DocsController;
