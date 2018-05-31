
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


### Just using docker-compose
<details>
<summary><strong>Details</strong></summary>

Put this into a `docker-compose.yml` file:
```
version: '3.3'

volumes:
  sense-docs:

services:

  qix:
    container_name: qix
    image: "qlikcore/engine:${QIX_ENGINE_VER:-latest}"
    command: [
      "-S", "DocumentDirectory=/docs",
      "-S", "AcceptEULA=${QIX_ACCEPT_EULA:-no}"
    ]
    volumes:
      - sense-docs:/docs
    ports:
      - "9076:9076"
    expose:
      - 9076

  sense-docs:
    image: stefanwalther/sense-docs
    volumes:
      - sense-docs:/opt/sense-docs/docs
    tty: true

  qix-graphql:
    container_name: qix-graphql
    image: "stefanwalther/qix-graphql"
    ports:
      - "3004:3004"
    environment:
      - QIX_HOST=qix
      - QIX_PORT=9076
      - HOST=qix-graphql
      - PORT=3004
    restart: always
    command: ["npm", "run", "start"]
```

Then run `QIX_ENGINE_VER=12.171.0 QIX_ACCEPT_EULA=yes docker-compose up`

</details>