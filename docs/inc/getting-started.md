Before we connect to various environments (such as Qlik Sense Enterprise, Qlik Core solutions, etc.), let's get started with a *simple demo*.

<details>
<summary>Getting the demo up and running</summary>

The demo will consist of the following logical components:

- A QIX Engine (using the the Qlik Core Engine container)
- A few demo apps mounted to the QIX Engine
- A GraphQL server connected to the QIX Engine

All services will be spawn up using docker-compose (which requires e.g. Docker for Mac/Windows running on your machine).

As this demo is included in the _qix-graphql_ repo, the easiest way to get started is to clone this repo:

```
$ git clone https://github.com/stefanwalther/qix-graphql
```

Then run the following command: 

```
$ QIX_ENGINE_VER=12.171.0 QIX_ACCEPT_EULA=yes docker-compose up -d
```
Note: `QIX_ENGINE_VER` and `QIX_ACCEPT_EULA` are environment variables being used in the docker-compose file.

</details>

### Explore the GraphQL API using the GraphiQL IDE

<details>
<summary>Explore the GraphQL server using GraphiQL</summary>

We can now open http://localhost:3004/global/graphql in your browser to get the [GraphiQL](https://github.com/graphql/graphiql) user interface.
GraphiQL is a graphical interactive in-browser GraphQL IDE, which allows you to explore the API being provided by _qix-graphql_, the GraphQL server.

![](./docs/images/graphiql-global.png)

We can also easily get a list of all documents in the IDE:

![](./docs/images/graphiql-global-docs.png)

Note: GraphiQL also provides intellisense, built-in documentation and more, see here for some [tipps & tricks for GraphiQL](./docs/about-graphiql.md).

In the examples above we have acted on the *global* scope, which allows us to explore meta-information about different Qlik documents.

Using the URL stated in `doc/_links/_docs` we can connect to a single document.

</details>

<details>
<summary>Explore the API of a single document, using GraphiQL</summary>

If we use (as defined by this demo) `http://localhost:3004/doc/:qDocId/graphql` we connect to a single document and its API:

Going to the built-in documentation, we'll see the tables of this document we can query:

![](./docs/images/graphiql-doc-docs.png)

So let's query one of those tables (in this example the table `account` on the doc `CRM.qvf`:

![](./docs/images/graphiql-doc-account-table.png)

</details>

### Developing a Client

<details>
<summary>Creating a client in node.js</summary>
OK, so far we have seen that we can easily explore the generated APIs on a global and on a doc scope.  
Now let's create some code so see how we can use the server when developing a custom application using the GraphQL server. It can basically be any kind of an application, a backend-service, a website, a native mobile app; essentially the approach is always the same:

```js
const client = require('graphql-client')({
  url: 'http://localhost:3004/global/graphql'
});

async function getDocs() {
  const query = `{
              docs {
                qDocId
                qDocName
              }
            }`;
  const vars = '';
  return await client.query(query, vars);
}

(async () => {
  let result = await getDocs();
  console.log('Apps in the current environment:\n');
  result.data.docs.forEach(item => {
    console.log(`\t- ${item.qDocName}`);
  });
})();
```

This will return:

![](./docs/images/graphiql-example-nodejs.png)

So we don't need to use enigma.js, we don't need to understand specific constructs of the QIX Engine such as qHyperCube, it's basically a very straightforward development experience using common tools.

</details>