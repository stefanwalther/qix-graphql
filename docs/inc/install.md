
_qix-graphql_ is already packaged as Docker image ([stefanwalther/qix-graphql](https://hub.docker.com/r/stefanwalther/qix-graphql/)).

```
$ docker run -d -p 3004:3004 stefanwalther/qix-graphql
```

### Configuration

The following configuration parameters are available:

- `HOST` - Host of the GraphQL server, defaults to `localhost`
- `PORT` - Port of the GraphQL server, defaults to `3004` 
- `QIX_HOST` - Host of the QIX Engine, defaults to `qix`
- `QIX_PORT`- Port of the QIX Engine, defaults to `9076`