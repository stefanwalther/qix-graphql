// Todo: Probably the entire module can be removed or simplified ....
const Prototyping = require('./../prototyping-to-be-moved');

const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat
} = require('graphql');

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
    qDocName: {type: GraphQLString},
    qConnectedUsers: {type: GraphQLInt},
    qFileTime: {type: GraphQLFloat},
    qFileSize: {type: GraphQLFloat},
    qDocId: {type: GraphQLString},
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
    qTitle: {type: GraphQLString},
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
          _self: {type: GraphQLString},
          _doc: {type: GraphQLString}
        }
      })
    }
  }
});

const RootQueryType = new GraphQLObjectType({
  name: 'root',
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
        console.log('args', args);
        return Prototyping.getDoc(args.qDocId);
      }
    },
    docs: {
      type: new GraphQLList(DocType),
      resolve: (/* obj, args, ctx */) => {
        return Prototyping.getDocs();
      }
    },
    docfields: {
      type: TableAndKeys,
      args: {
        qDocId: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (/* obj, args, ctx */) => {
        return {
          qtr: [{
            qName: 'Test'
          }]
        };
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQueryType
});

module.exports = schema;
