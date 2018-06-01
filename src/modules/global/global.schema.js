const GlobalResolvers = require('./global.resolvers');
const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat
} = require('graphql');

// Todo: implement additional fields
const TableRecord = new GraphQLObjectType({
  name: 'TableRecord',
  fields: {
    qName: {type: GraphQLString}
    // ,
    // qLoose: {type: GraphQLBoolean},
    // qNoOfRows: {type: GraphQLInt},
    // // qFields: {type: FieldInTableData},
    // // qPos: { type: Point},
    // qComment: {type: GraphQLString},
    // qIsDirectDiscovery: {type: GraphQLBoolean},
    // qIsSynthetic: {type: GraphQLBoolean}
  }
});

// Todo: implement additional fields
// eslint-disable-next-line no-unused-vars
const TableAndKeys = new GraphQLObjectType({
  name: 'TableAndKeys',
  fields: {
    qtr: {type: new GraphQLList(TableRecord)}
    // ,
    // qk: {new GraphQLList(SourceKeyRecord)}
  }
});

const DocType = new GraphQLObjectType({
  name: 'DocType',

  fields: {
    qDocName: {
      type: GraphQLString,
      description: 'Name of the document'
    },
    qConnectedUsers: {type: GraphQLInt},
    qFileTime: {type: GraphQLFloat},
    qFileSize: {type: GraphQLFloat},
    qDocId: {
      type: GraphQLString,
      description: 'Id of the document'
    },
    qMeta: {
      type: new GraphQLObjectType({
        name: 'qMeta',
        fields: {
          description: {type: GraphQLString},
          qFileSize: {type: GraphQLFloat},
          dynamicColor: {type: GraphQLString}
        }
      })
    },
    qLastReloadTime: {type: GraphQLString},
    qTitle: {
      type: GraphQLString,
      description: 'Title of the document'
    },
    qThumbNail: {
      type: new GraphQLObjectType({
        name: 'qThumbnail',
        fields: {
          qUrl: {type: GraphQLString}
        }
      })
    },
    _links: {
      type: new GraphQLObjectType({
        name: '_links',
        fields: {
          _doc: {type: GraphQLString}
        }
      })
    }
  }
});

const RootQueryType = new GraphQLObjectType({
  name: 'Global',
  fields: {
    doc: {
      type: DocType,
      description: 'Return a single document.',
      args: {
        qDocId: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (obj, args /* , ctx */) => {
        return GlobalResolvers.getDoc(args.qDocId);
      }
    },
    docs: {
      type: new GraphQLList(DocType),
      description: 'Return all Qlik documents available in the current environment.',
      resolve: (/* obj, args, ctx */) => {
        return GlobalResolvers.getDocs();
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQueryType
});

module.exports = schema;
