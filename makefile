DB_DATA=internal/postgresql/data
#TESTE

help: #https://dev.to/flpslv/using-makefiles-to-build-and-publish-docker-containers-7c8
	    @echo "Makefile arguments:"
	    @echo ""
	    @echo "alpver - Alpine Version"
	    @echo "kctlver - kubectl version"
	    @echo ""
	    @echo "Makefile commands:"
	    @echo "build"
	    @echo "push"
	    @echo "all"

check:

install-prerequisites:
	docker pull timescale/timescaledb:latest-pg14


list-images:
	docker images
up:
	docker compose up
destroy-volumes:
	docker compose down --volumes && rm -rf $(DB_DATA)/*