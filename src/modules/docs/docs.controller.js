const enigma = require('./../../../node_modules/enigma.js/');
const WebSocket = require('ws');
const schema = require('enigma.js/schemas/12.20.0.json');

class DocsController {

  static get(req, res, next) {

    const session = enigma.create({
      schema,
      url: 'ws://localhost:9076/app',
      createSocket: url => new WebSocket(url)
    });

    // Bind traffic events to log what is sent and received on the socket:
    session.on('traffic:sent', data => console.log('sent:', data));
    session.on('traffic:received', data => console.log('received:', data));

    res.setHeader('Content-Type', 'application/json');
    res.send({
      ts: new Date().toJSON()
    });
    next();
  }

}

module.exports = DocsController;
