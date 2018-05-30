const schemaCache = require('../../src/lib/schema-cache');

describe('UNIT => schema-cache', () => {

  beforeEach(() => {
    schemaCache.reset();
  });

  it('exists', () => {
    expect(schemaCache).to.exist;
  });

  it('has a property cache', () => {
    expect(schemaCache).to.have.property('cache').to.exist;
  });

  it('has zero cache objects by default', () => {
    expect(schemaCache.count()).to.equal(0);
  });

  it('allows to add an object to the cache', () => {
    const qDocId = 'foo';
    const obj = {
      foo: 'bar'
    };
    expect(schemaCache.count()).to.be.equal(0);
    schemaCache.add(qDocId, obj);
    expect(schemaCache.count()).to.be.equal(1);
    expect(schemaCache.find(qDocId)).to.be.equal(obj);
  });

  it('allows to check if an item exists', () => {
    const qDocId = 'foo';
    const obj = {
      foo: 'bar'
    };
    expect(schemaCache.count()).to.be.equal(0);
    schemaCache.add(qDocId, obj);
    expect(schemaCache.count()).to.be.equal(1);
    expect(schemaCache.find(qDocId)).to.be.equal(obj);
    expect(schemaCache.exists(qDocId)).to.be.true;
  });

});
