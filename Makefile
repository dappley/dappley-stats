.SILENT:
all:
	@echo "Usage: make image|container|stop|clean"

CONTAINER_NAME=dapp

image: clean
	yarn build && \
	docker build -t dappley-stats -f Dockerfile .

container: stop clean
	docker run -d --name ${CONTAINER_NAME} -p 8081:8081 -t dappley-stats && \
	docker exec -it ${CONTAINER_NAME} bash

stop:
	docker stop ${CONTAINER_NAME} || true

.PHONY: clean
clean: stop
	docker image prune && \
	docker container prune
