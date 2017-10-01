const logger = require('winster').instance(); // eslint-disable-line no-unused-vars
const lib = require('./lib');
// Todo: const qixResolvers = require('./qix-resolvers');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList
  // GraphQLInt
} = require('graphql');

class GraphQlGenerator {

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
  }

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
   * Options.tables_and_keys
   * options.table_and_keys
   * @param options
   * @param {String} options.qDocId - Id of the document.
   * @param {Object} options.tables_and_keys
   * options.nx_app_layout
   *
   * Todo: bookmarks
   *
   */
  getSchema() {

    this._generateTypes();

    return new GraphQLSchema({
      query: this._getRootQuery()
    });
  }

  /**
   *
   * @param types
   * @private
   */
  _getRootQuery() {
    return new GraphQLObjectType({
      name: 'root',
      fields: this._getTables()
    });
  }

  _generateTypes() {
    // Console.log('generateTypes.tables_and_keys.qtr', this.options.tables_and_keys.qtr);
    this.options.tables_and_keys.qtr.forEach(t => {
      this._types[lib.normalize(t.qName)] = new GraphQLObjectType({
        name: lib.normalize(t.qName),
        description: `${t.qName} table`,
        fields: this._getFields(t)
      });
    });
    // This.logger.verbose('this._types', this._types);
  }

  /**
   *
   * @returns {{}}
   * @private
   */
  _getTables() {
    let r = {};

    this.options.tables_and_keys.qtr.forEach(t => {
      let inputType = this._types[lib.normalize(t.qName)];
      r[lib.normalize(t.qName)] = {
        type: new GraphQLList(inputType),
        resolve: (obj, args, ctx) => {
          this.logger.verbose('we are resolving table: ', t.qName);
          this.logger.verbose('obj', obj || '<not set>');
          this.logger.verbose('args', args || '<not set>');
          this.logger.verbose('ctx', ctx || '<not set>');
          //return qixResolvers({qDocName: options.qDocId, qTable: t.qName});
          return ctx.qixResolvers.resolveTable(ctx);
        }
      };
    });

    return r;
  }
  _getFields(t) {
    let r = {};

    t.qFields.forEach(f => {
      r[lib.normalize(f.qName)] = {
        type: GraphQlGenerator._matchTypeFromTags(f.qTags)
      };
    });

    return r;
  }

  // Todo: There are several cases we have to think of => get some insights how tagging works ...
  static _matchTypeFromTags(tags) {
    if (tags.indexOf('$numeric')) {
      return GraphQLFloat;
      // eslint-disable-next-line no-else-return
    } else {
      return GraphQLString;
    }
  }

}

module.exports = GraphQlGenerator;
