const GraphQl = require('graphql');
const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean
} = require('graphql');

const schema1 = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'root',
    fields: {
      doc: {
        type: GraphQLString,
        resolve: (obj, args, ctx) => {
          return 'schema1 doc';
        }
      }
    }
  })
});

const schema2 = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'root',
    fields: {
      doc: {
        type: GraphQLString,
        resolve: (obj, args, ctx) => {
          return 'schema2 doc';
        }
      }
    }
  })
});

module.exports = {
  schema1,
  schema2
};
