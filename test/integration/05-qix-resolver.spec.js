const docResolver = require('../../src/modules/doc/doc.resolvers');
const mockTablesAndKeys = require('./../fixtures/TablesAndKeys-CRM.json');

describe('qixResolver', () => {
  xdescribe('resolveTable', () => {

    it('throws an error without context', () => {
      let fn = () => {
        docResolver.resolveTable();
      };
      expect(fn).to.throw(Error, "Cannot read property 'config' of undefined");
    });

    // Todo: we have new params there, so this all needs to be fixed
    // when working on this functionality
    xit('resolves the table', async () => {
      let ctx = {
        config: {
          QIX_HOST: 'localhost'
        },
        tables_and_keys: mockTablesAndKeys
      };
      let result = await docResolver.resolveTable(null, null, ctx); // Todo: pass variables in here
      expect(result).to.exist;
      expect(result).to.be.an('array');
    });
  });
});
