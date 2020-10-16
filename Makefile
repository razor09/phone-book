up: database-up express-api-up angular-client-up vue-client-up react-client-up
down: react-client-down vue-client-down angular-client-down express-api-down database-down

on: database-up express-api-on angular-client-on vue-client-on react-client-on
off: react-client-off vue-client-off angular-client-off express-api-off database-down

database-up:
	docker-compose up -d database
database-down:
	docker-compose stop database
express-api-up:
	docker-compose up -d express-api
express-api-down:
	docker-compose stop express-api
angular-client-up:
	docker-compose up -d angular-client
angular-client-down:
	docker-compose stop angular-client
vue-client-up:
	docker-compose up -d vue-client
vue-client-down:
	docker-compose stop vue-client
react-client-up:
	docker-compose up -d react-client
react-client-down:
	docker-compose stop react-client

express-api-on:
	cd express-api && npm start
express-api-off:
	cd express-api && npm stop
angular-client-on:
	cd angular-client && npm start
angular-client-off:
	cd angular-client && npm stop
vue-client-on:
	cd vue-client && npm start
vue-client-off:
	cd vue-client && npm stop
react-client-on:
	cd react-client && npm start
react-client-off:
	cd react-client && npm stop
