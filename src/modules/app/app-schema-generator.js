const logger = require('winster').instance(); // eslint-disable-line no-unused-vars
const lib = require('../../lib/lib');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');

class AppSchemaGenerator {

  /**
   *
   * @param options
   * @param options.qDocId
   * @param options.tables_and_keys
   */
  constructor(options) {
    this.options = options;
    this.logger = logger;

    this._validateOptions();

    this._types = {};
    this._tableCache = {};
  }

  /**
   * Some validations to be used when initializing the class.
   * @returns {boolean}
   * @private
   */
  _validateOptions() {
    if (!this.options.qDocId) {
      throw new Error('qDocId is missing');
    }
    if (!this.options.tables_and_keys) {
      throw new Error('tables_and_keys is missing');
    }
    if (!this.options.tables_and_keys.qtr) {
      throw new Error('tables_and_keys.qtr is missing');
    }
    return true;
  }

  /**
   * Returns the schema for a given app.
   *
   * @param options
   * @param {String} options.qDocId - Id of the document.
   * @param {Object} options.tables_and_keys
   * options.nx_app_layout
   */
  getSchema() {

    this._initTypes();
    this._initTableCache();

    return new GraphQLSchema({
      query: this._getRootQuery()
    });
  }

  /**
   * Return the root query for the given document.
   *
   * @private
   */
  _getRootQuery() {
    return new GraphQLObjectType({
      name: 'root',
      description: `Data from the app "${this.options.qDocId}" (${this.options.qDocName})`,
      fields: this._getRootFields()
    });
  }

  _getRootFields() {
    let queries = {};
    Object.assign(queries, this._getTablesQuery());
    Object.assign(queries, this._getAnotherQuery());

    queries = lib.sort_objects(queries);

    return queries;
  }

  /**
   * @Todo: Document this
   *
   * @returns {{}}
   * @private
   */
  _getTablesQuery() {
    let r = {};

    this.options.tables_and_keys.qtr.forEach(t => {
      let tableName = lib.sanitize(t.qName);
      let inputType = this._types[tableName];
      let fields = this._tableCache[tableName];
      r[lib.sanitize(t.qName)] = {
        type: new GraphQLList(inputType),
        resolve: (obj, args, ctx) => {
          // Todo(AAA): Here we can potentially pass in the list of fields
          return ctx.qixResolvers.resolveTable(this.options.qDocId, tableName, fields, ctx);
        }
      };
    });
    return r;
  }

  _getAnotherQuery() {
    let r = [];
    r._tables_and_keys = {
      name: 'test',
      type: GraphQLString,
      resolve: (obj, args, ctx) => {
        return ctx.qixResolvers.resolveDummy();
      }
    };
    return r;
  }

  // Todo: Could make sense to refactor this to be a function to return the types.
  /**
   * Initializes the types based on this.options.tables_and_keys
   *
   * @private
   */
  _initTypes() {
    // Console.log('generateTypes.tables_and_keys.qtr', this.options.tables_and_keys.qtr);
    this.options.tables_and_keys.qtr.forEach(t => {
      this._types[lib.sanitize(t.qName)] = new GraphQLObjectType({
        name: lib.sanitize(t.qName),
        description: `${t.qName} table`,
        fields: this._getFields(t)
      });
    });
  }

  /**
   * Instantiate the internal _tableCache object, which makes it easier to work with table of this document.
   *
   * @private
   */
  _initTableCache() {
    this.options.tables_and_keys.qtr.forEach(t => {
      let fields = [];
      t.qFields.forEach(f => {
        fields.push(lib.sanitize(f.qName));
      });
      this._tableCache[lib.sanitize(t.qName)] = fields;
    });
  }

  /**
   * Return the fields for a given table.
   *
   * @param {string} table - The name of the table.
   *
   * @returns {object}
   * @private
   */
  _getFields(table) {
    let r = {};

    table.qFields.forEach(f => {
      r[lib.sanitize(f.qName)] = {
        type: AppSchemaGenerator._matchTypeFromTags(f.qTags)
      };
    });

    return r;
  }

  // Todo: There are several cases we have to think of => get some insights how tagging works ...
  static _matchTypeFromTags(/* tags */) {

    return GraphQLString;

    // Todo: needs to be tested properly
    // if (tags.indexOf('$numeric')) {
    //   return GraphQLFloat;
    //   // eslint-disable-next-line no-else-return
    // } else {
    //   return GraphQLString;
    // }
  }

  static DummyType() {
    return new GraphQLObjectType({
      name: 'DummyType',
      fields: {
        foo: GraphQLString,
        bar: GraphQLString
      }
    });
  }

}

module.exports = AppSchemaGenerator;
