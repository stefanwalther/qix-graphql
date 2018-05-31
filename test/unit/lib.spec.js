const lib = require('./../../src/lib/lib');

describe('lib', () => {

  it('exposes a method sanitize', () => {
    expect(lib).to.have.a.property('sanitize');
  });

  describe('sanitize', () => {
    it('removes whitespaces', () => {
      expect(lib.sanitize('foo bar')).to.be.equal('foo_bar');
    });
    it('removes special characters', () => {
      const s = '"$%&/()?';
      const s_sanitized = '________';
      expect(lib.sanitize(s)).to.be.equal(s_sanitized);
    })
  });

});
