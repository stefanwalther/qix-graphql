require('mocha');
global.expect = require('chai').expect;
const script = require('./index');

describe('Run the test', () => {
  it('returns a collection of docs', async () => {
    let result = await script.getDocs();
    expect(result).to.exist;
    expect(result).to.have.a.property('data');
    expect(result.data).to.have.a.property('docs');
    expect(result.data.docs).to.exist.to.be.an('array');
  })
});
