.PHONY: up
up:
	docker compose -p todo-list -f ./docker-compose.dev.yml -f ./docker-compose.service.yml up -d

.PHONY: migration
migration:
	docker exec -it todo-list-api-server-1 pnpm migration

.PHONY: down
down:
	docker compose -p todo-list down

.PHONY: build
build:
	docker buildx build --platform linux/amd64 -t api-server:latest -f ./api-server/Dockerfile ./api-server
