help:								## Show this help.
	@echo ''
	@echo 'Available commands:'
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo ''
.PHONY: help

gen-readme:					## Generate README.md (using docker-verb)
	docker run --rm -v ${PWD}:/opt/verb stefanwalther/verb
.PHONY: gen-readme

gen-readme-watch:
	npm run docs:watch
.PHONY: gen-readme-watch

up-deps:
	docker-compose --f=./docker-compose.deps.yml up --build
.PHONY: up-deps

down-deps:
	docker-compose --f=./docker-compose.deps.yml down
.PHONY: down-deps
