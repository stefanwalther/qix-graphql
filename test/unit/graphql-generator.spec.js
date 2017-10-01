const QixGraphQlGenerator = require('./../../src/lib/qix-graphql-schema-generator/qix-graphql-generator');
const mockTablesAndKeys = require('./../fixtures/TablesAndKeys-CRM.json');

describe('UNIT => qix-graphql-generator', () => {

  describe('=> ctor', () => {

    it('should throw an error if options.qDocId is not provided', () => {
      let fn = () => {
        new QixGraphQlGenerator({});
      };
      expect(fn).to.throw(Error, 'qDocId is missing');
    });

    it('should throw an error if options.qDocId is not provided', () => {
      let fn = () => {
        new QixGraphQlGenerator({
          qDocId: 'foo'
        });
      };
      expect(fn).to.throw(Error, 'tables_and_keys is missing');
    });

    it('should throw an error if options.qDocId is not provided', () => {
      let fn = () => {
        new QixGraphQlGenerator({
          qDocId: 'foo',
          tables_and_keys: {}
        });
      };
      expect(fn).to.throw(Error, 'tables_and_keys.qtr is missing');
    });

    it('should NOT throw an error if everything is provided as expected', () => {
      let fn = () => {
        new QixGraphQlGenerator({
          qDocId: 'foo',
          tables_and_keys: {
            qtr: []
          }
        });
      };
      expect(fn).to.not.throw();
    });
  });

  describe('=> _generateTypes', () => {
    it('should succeed', () => {
      try {
        let g = new QixGraphQlGenerator({
          qDocId: 'foo',
          tables_and_keys: mockTablesAndKeys
        });
        g._generateTypes();
        expect(g._types).to.exist;
        expect(g._types).to.contain.property('account');
      } catch (e) {
        expect(e).not.to.throw();
      }
    });
  });

  xdescribe('=> getSchema', () => {
    it('generates a schema', () => {
      expect(true).to.be.false;
    });
  });
});

