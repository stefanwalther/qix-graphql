const logger = require('winster').instance();
const SchemaGenerator = require('./../../lib/qix-graphql-schema-generator/schema-generator');
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

var schemas = {};

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

// Todo: This is where we could introduce a cache which can scale out, e.g. Redis
const genSchema = qDocId => {
  return new Promise((resolve, reject) => {
    if (schemas[qDocId]) {
      logger.verbose('Returning schema from cache', qDocId);
      return resolve(schemas[qDocId]);
    }
    setTimeout(() => {
      logger.verbose('Creating schema: ', qDocId);
      SchemaGenerator.generateSchema({qDocId})
        .then(schema => {
          logger.verbose('==> OK, we got a schema');
          schemas[qDocId] = schema;
          resolve(schema1);
        })
        .catch(err => {
          logger.error('We have an error creating the schema', err);
          reject(err);
        });
    }, 2000);
  });
};

module.exports = {
  schema1,
  schema2,
  genSchema
};
