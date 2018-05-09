help:												## Show this help.
	@echo ''
	@echo 'Available commands:'
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo ''
.PHONY: help

gen-readme:									## Generate README.md (using docker-verb)
	docker run --rm -v ${PWD}:/opt/verb stefanwalther/verb
.PHONY: gen-readme

gen-readme-watch:
	npm run docs:watch
.PHONY: gen-readme-watch

build:											## Build the docker image (production)
	docker build --force-rm -t stefanwalther/qix-graphql -f Dockerfile.prod .
.PHONY: build

build-test:									## Build the docker image (test image)
	docker build --force-rm -t stefanwalther/qix-graphql-test -f Dockerfile.test .
.PHONY: build-test

up-deps:										## Bring up all dependencies
	docker-compose --f=./docker-compose.deps.yml up --build
.PHONY: up-deps

down-deps:									## Tear down all dependencies
	docker-compose --f=./docker-compose.deps.yml down
.PHONY: down-deps

up:													## Bring up the local demo-environment
	docker-compose --f=./docker-compose.yml up --build
.PHONY: up

down:												## Tear down the local demo-environment
	docker-compose --f=./docker-compose.yml down
.PHONY: down

#up-test:										## Bring up the test environment (docker-compose up => docker-compose.test.yml)
#	docker-compose --f=docker-compose.test.yml up -d
#.PHONY: up-test

run-test:										## Run tests
	docker-compose --f=docker-compose.test.yml run qix-graphql-test npm run test
.PHONY: run-test
