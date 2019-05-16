.SILENT:
all:
	@echo "Usage: make image|container|stop|clean|clean-all"

CONTAINER_NAME=dapp
IMAGE_NAME=dappley-stats

image: clean
	yarn build && \
	docker build -t ${IMAGE_NAME} -f Dockerfile .

container: stop clean
	docker run -d --name ${CONTAINER_NAME} -p 8081:8081 -t dappley-stats && \
	docker exec -it ${CONTAINER_NAME} bash

stop:
	docker stop ${CONTAINER_NAME} || true

.PHONY: clean
clean: stop
	docker image prune && \
	docker container prune

clean-all: clean
	docker rmi ${IMAGE_NAME} || true