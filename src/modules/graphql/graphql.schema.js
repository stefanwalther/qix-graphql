const GraphQl = require('graphql');

const schema = new GraphQl.GraphQLSchema({
  query: new GraphQl.GraphQLObjectType({
    name: 'hello',
    fields: {
      world: {
        type: GraphQl.GraphQLString,
        resolve() {
          return 'world';
        }
      }
    }
  })
});

module.exports = schema;
