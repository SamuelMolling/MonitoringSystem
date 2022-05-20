DB_DATA=internal/postgresql/data
GRAFANA_DATA=internal/grafana/data

#TESTE

help: #https://dev.to/flpslv/using-makefiles-to-build-and-publish-docker-containers-7c8
	    @echo "Makefile arguments:"
	    @echo ""
	    @echo "alpver - Alpine Version"
	    @echo "kctlver - kubectl version"
	    @echo ""
	    @echo "Makefile commands:"
	    @echo "build"
	    @echo "destroy"
	    @echo "up"

build:
	cd internal/pkg/check-location/ && make build
	sh internal/pkg/myip/build.sh

check:

install-prerequisites:
	docker pull timescale/timescaledb:latest-pg14
	docker pull grafana/grafana

list-images:
	docker images
up:
	docker compose up
destroy:
	docker compose down --volumes
	rm -rf $(DB_DATA)/*
	rm -rf $(GRAFANA_DATA)/*