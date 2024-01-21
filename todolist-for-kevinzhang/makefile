NEXT_PUBLIC_GRAPHQL_ENTRYPOINT ?= $(error Please set NEXT_PUBLIC_GRAPHQL_ENTRYPOINT variable)

.PHONY: up
up:
	docker compose -p todo-list -f ./docker-compose.prod.yml -f ./docker-compose.service.yml up -d

.PHONY: migration
migration:
	docker exec -it todo-list-api-server-1 pnpm migration

.PHONY: down
down:
	docker compose -p todo-list down

.PHONY: build
build:
	@$(MAKE) -j 2 build-api-server build-web

build-api-server:
	docker buildx build --platform linux/amd64 -t api-server:latest -f ./api-server/Dockerfile ./api-server

build-web:
	docker buildx build --platform linux/amd64 -t web:latest \
		--build-arg NEXT_PUBLIC_GRAPHQL_ENTRYPOINT="$(NEXT_PUBLIC_GRAPHQL_ENTRYPOINT)" \
		-f ./web/Dockerfile ./web

