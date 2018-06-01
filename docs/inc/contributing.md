I am actively looking for people out there, who think that this project is an interesting idea and want to contribute.

<details>
<summary><strong>Contributing</strong></summary>
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue]({%= bugs.url %}). The process for contributing is outlined below:

1. Create a fork of the project
2. Work on whatever bug or feature you wish
3. Create a pull request (PR)

I cannot guarantee that I will merge all PRs but I will evaluate them all.
</details>

<details>
<summary><strong>Local Development</strong></summary>

The easiest way to develop locally is follow these steps:

1) Clone the GitHub repo
```
$ git clone https://github.com/stefanwalther/qix-graphql
```

2) Install the dependencies
```
$ npm install
```

3) Start the dependencies (Qlik Associative Engine + a few sample apps mounted):
```
$ make up-deps
```

Make your code changes, then:

- Run local tests: `npm run test`
- Run local tests with a watcher: `npm run test`
- Start the GraphQl server: `npm run start`
- Start the GraphQl server with a watcher: `npm run start:watch`

</details>

<details>
<summary><strong>Running Tests</strong></summary>

Having the local dependencies up and running, you can just run the tests by executing:

```
$ npm run test
```

If you want to have an watcher active, use:

```
$ npm run test:watch
```

</details>

<details>
<summary><strong>CircleCI Tests</strong></summary>

To simulate the tests running on CircleCI run the following:

```
$ make circleci-test
```

</details>
