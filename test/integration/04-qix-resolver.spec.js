const qixResolver = require('./../../src/lib/qix-graphql-schema-generator/qix-resolvers');
const mockTablesAndKeys = require('./../fixtures/TablesAndKeys-CRM.json');

describe('qixResolver', () => {
  describe('resolveTable', () => {

    xit('throws an error without context', () => {
      try {
        qixResolver.resolveTable();
      } catch (e) {
        expect(e).to.exist;
        expect(e.message).to.contain('Cannot read property');
      }
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
      let result = await qixResolver.resolveTable(null, null, ctx); // Todo: pass variables in here
      expect(result).to.exist;
      expect(result).to.be.an('array');
    });
  });
});
