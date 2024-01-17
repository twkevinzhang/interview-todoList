.PHONY: up
up:
	docker compose -p todo-list -f ./docker-compose.dev.yml -f ./docker-compose.service.yml up -d

.PHONY: down
down:
	docker compose -p todo-list down

.PHONY: build
build:
	docker buildx build --platform linux/amd64 -t api-server:latest -f ./Dockerfile .
