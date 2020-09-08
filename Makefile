start:
	docker-compose up -d
stop:
	docker-compose stop
down:
	docker-compose down --remove-orphans
build:
	docker-compose build
pull:
	docker-compose pull


start-qa:
	docker-compose -f docker-compose-qa.yml up -d
stop-qa:
	docker-compose -f docker-compose-qa.yml stop
down-qa:
	docker-compose -f docker-compose-qa.yml down --remove-orphans
build-qa:
	docker-compose -f docker-compose-qa.yml build
pull-qa:
	docker-compose -f docker-compose-qa.yml pull

deploy-qa:
	make start-qa build-qa
