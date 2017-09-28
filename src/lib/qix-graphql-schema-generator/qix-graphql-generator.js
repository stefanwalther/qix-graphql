const graphql = require('graphql'); // eslint-disable-line no-unused-vars
const logger = require('winster').instance(); // eslint-disable-line no-unused-vars
const lib = require('./lib');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt
} = require('graphql');

class GraphQlGenerator {

  // Constructor(config) {
  //   // This.config = config;
  //   // this.logger = logger;
  // }

  /**
   * Options.tables_and_keys
   * options.table_and_keys
   * options.nx_app_layout
   *
   * Todo: bookmarks
   *
   */
  getSchema(options) {

    let types = this._generateTypes(options);

    return new GraphQLSchema({
      query: this._getRootQuery(options, types)
    });
  }

  _generateTypes(options) {
    let _types = {};

    options.tables_and_keys.qtr.forEach(t => {
      _types[lib.normalize(t.qName)] = new GraphQLObjectType({
        name: lib.normalize(t.qName),
        description: `${t.qName} table`,
        fields: this._getFields(t)
      });
    });

    return _types;
  }

  // Todo: There are several cases we have to think of => get some insights how tagging works ...
  static _matchTypeFromTags(tags) {
    if (tags.indexOf('$numeric')) {
      return GraphQLFloat
    } else {
      return GraphQLString
    }
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

  _getRootQuery(options, types) {
    return new GraphQLObjectType({
      name: 'root',
      fields: this._getTables(options, types)
    });
  }

  _getTables(options, types) {
    let r = {};

    options.tables_and_keys.qtr.forEach(t => {
      let inputType = types[lib.normalize(t.qName)];
      r[lib.normalize(t.qName)] = {
        type: new GraphQLList(inputType)
      };
    });

    return r;
  }
}

module.exports = GraphQlGenerator;
