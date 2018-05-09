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

    xit('resolves the table', () => {
      let ctx = {
        config: {
          QIX_HOST: 'localhost'
        },
        tables_and_keys: mockTablesAndKeys
      };
      return qixResolver.resolveTable(ctx)
        .then(result => {
          expect(result).to.exist;
          expect(result).to.be.an('array');
        });
    });

  });
});
