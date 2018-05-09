process.env.NODE_ENV = 'test';
if (process.env.CIRCLECI !== 'true') {
  // Whatever we need here
}
global.expect = require('chai').expect;

