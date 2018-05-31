process.env.NODE_ENV = 'test';
if (process.env.CIRCLECI !== 'true') {
  // Whatever we need here
}
if (process.env.NODE_ENV === 'test') {
  process.env.WINSTER_SUPRESS_LOGGING = 'true';
}

const chai = require('chai');
const chaiSubset = require('chai-subset');
chai.use(chaiSubset);
global.expect = chai.expect;

