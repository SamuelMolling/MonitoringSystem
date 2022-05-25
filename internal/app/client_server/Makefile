rm:
	docker rm client
run:
	docker run --rm --privileged --name client -p 12345:12345 client:latest

build:
	docker build -t client:latest .