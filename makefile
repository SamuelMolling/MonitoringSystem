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
	cd internal/app/check-location/ && make build
	cd internal/app/server/ && make build

check:

install-prerequisites:
	docker pull timescale/timescaledb:latest-pg14
	docker pull grafana/grafana
	
up:
	docker compose up
destroy:
	docker compose down --volumes
	rm -rf $(DB_DATA)/
	rm -rf $(GRAFANA_DATA)/*