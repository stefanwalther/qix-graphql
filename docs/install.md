
### From GitHub

First clone the repository:
```
$ git clone https://github.com/stefanwalther/qix-graphql
```

Then run the following command:

```
$ QIX_ENGINE_VER=12.171.0 QIX_ACCEPT_EULA=yes docker-compose up
```
Note: By setting QIX_ACCEPT_EULA to `yes`, you accept the EULA [as described here](https://qlikcore.com/docs/getting-started/).

Then open http://localhost:3004/global/graphql in your browser to get to the GraphQl user interface.