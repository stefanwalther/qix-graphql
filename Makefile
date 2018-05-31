QIX_ENGINE_VER := "12.171.0"

help:												## Show this help.
	@echo ''
	@echo 'Available commands:'
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo ''
.PHONY: help

gen-readme:									## Generate README.md (using docker-verb)
	docker run --rm -v ${PWD}:/opt/verb stefanwalther/verb
.PHONY: gen-readme

gen-readme-watch:						## Watch docs and re-generate the README.md
	npm run docs:watch
.PHONY: gen-readme-watch

build:											## Build the docker image (production)
	docker build --force-rm -t stefanwalther/qix-graphql -f Dockerfile.prod .
.PHONY: build

build-test:									## Build the docker image (test image)
	docker build --force-rm -t stefanwalther/qix-graphql-test -f Dockerfile.test .
.PHONY: build-test

up-deps:										## Bring up all dependencies
	QIX_ENGINE_VER=$(QIX_ENGINE_VER) \
	docker-compose --f=./docker-compose.deps.yml up --build
.PHONY: up-deps

down-deps:									## Tear down all dependencies
	docker-compose --f=./docker-compose.deps.yml down
.PHONY: down-deps

up:													## Bring up the local demo-environment
	QIX_ENGINE_VER=$(QIX_ENGINE_VER) \
	docker-compose --f=./docker-compose.dev.yml up --build
.PHONY: up

down:												## Tear down the local demo-environment
	docker-compose --f=./docker-compose.dev.yml down
.PHONY: down

run-test:										## Run tests
	QIX_ENGINE_VER=$(QIX_ENGINE_VER) \
	docker-compose --f=docker-compose.test.yml run qix-graphql-test npm run test:ci
.PHONY: run-test
