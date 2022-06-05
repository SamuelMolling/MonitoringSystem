DB_DATA=internal/postgresql/data
GRAFANA_DATA=internal/grafana/data

#TESTE

help: #https://dev.to/flpslv/using-makefiles-to-build-and-publish-docker-containers-7c8
	    @echo "Makefile commands:"
		@echo "build"
	    @echo "install-prerequisites"
	    @echo "up"
	    @echo "destroy"

build:
	cd internal/app/check-location/ && make build
	cd internal/app/server/ && make build
	cd internal/app/client_server/ && make build
	cd internal/app/getMetricsAPI/ && make build
	cd internal/frontend/ && make build

install-prerequisites:
	docker pull postgres
	docker pull grafana/grafana
	make build
	
up:
	docker compose up
	cd internal/frontend/ && yarn dev
	
destroy:
	docker compose down --volumes
	rm -rf $(DB_DATA)/
	rm -rf $(GRAFANA_DATA)/*