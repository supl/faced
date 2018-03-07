all: node_modules/ example.key example.crt
	@echo "Everything seems find."
	@echo "Launch: node index.js"

example.crt:
example.key:
	openssl req -newkey rsa:4096 -nodes -keyout example.key -x509 -out example.crt


node_modules/: package-lock.json
	npm install
	@touch node_modules

