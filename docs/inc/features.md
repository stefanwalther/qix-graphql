_qix-graphql_ provides two basic different types of endpoints:

**Global Scope:**

- Getting information about one environment (e.g. listing all Qlik docs, etc.)

`http(s)://<qix-graphql-host>:<qix-graphql-port>/global/graphql`

**Doc Scope:**

- Connecting to a single Qlik document to perform operations such as
  - Getting the data from the given document
  - Being able to query the various tables & fields
  - Making selections
  - Creating on demand hypercubes
  - etc.
  
`http(s)://<qix-graphql-host>:<qix-graphql-port>/doc/:qDocId/graphql`
