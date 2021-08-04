.PHONY: get-permissions
get-permissions:
	chmod +x ./internal/bin/amake

.PHONY: bootstrap-repo
bootstrap-repo: get-permissions bootstrap bootstrap-links

.PHONY: bootstrap
bootstrap:
	yarn install

.PHONY: create
create:
	./node_modules/.bin/ts-node ./internal/commands/create

.PHONY: add
add:
	./node_modules/.bin/ts-node ./internal/commands/add

.PHONY: link
link:
	./node_modules/.bin/ts-node ./internal/commands/link

.PHONY: bootstrap-entity
bootstrap-entity:
	./node_modules/.bin/ts-node ./internal/commands/bootstrap

.PHONY: bootstrap-links
bootstrap-links:
	./node_modules/.bin/ts-node ./internal/commands/bootstrap-links

.PHONY: rollback-links
rollback-links:
	./node_modules/.bin/ts-node ./internal/commands/rollback-links

.PHONY: build
build:
	./node_modules/.bin/ts-node ./internal/commands/build

.PHONY: build-front-package
build-front-package:
	./node_modules/.bin/rollup --config ./internal/configs/rollup.config.js

.PHONY: build-back-package
build-back-package: badge-version
	./node_modules/.bin/tsc $(CURRENT_PROJECT)/src/*.ts\
		$$(./node_modules/.bin/ts-node ./internal/commands/inline-tsconfig)

.PHONY: test
test:
	./node_modules/.bin/ts-node ./internal/commands/test

.PHONY: test-package
test-package:
	./node_modules/.bin/jest --color --runInBand --config ./internal/configs/jest.config.js $(_ARGS)

.PHONY: test-back-package
test-back-package: test-package

.PHONY: test-front-package
test-front-package: test-package

.PHONY: report-entity
report-entity:
	./node_modules/.bin/ts-node ./internal/commands/report

.PHONY: badge-coverage
badge-coverage:
	./node_modules/.bin/jest-coverage-badges \
		--input $(CURRENT_PROJECT)/reports/coverage/coverage-summary.json \
 		--output $(CURRENT_PROJECT)/reports/badges

.PHONY: badge-version
badge-version:
	./node_modules/.bin/badge \
		version \
		$$(node -e "console.log(require('./$(CURRENT_PROJECT)/package.json').version)") \
		:brightgreen \
		> $(CURRENT_PROJECT)/reports/badges/badge-version.svg

.PHONY: report-coverage
report-coverage:
	./internal/bin/amake test-package --coverage

.PHONY: report
report: report-coverage badge-coverage

.PHONY: prerelease
prerelease:
	./node_modules/.bin/ts-node ./internal/commands/prerelease

.PHONY: prerelease-package
prerelease-package: report-coverage badge-coverage badge-version
