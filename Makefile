.PHONY: help

help:
	@perl -nle'print $& if m{^[a-zA-Z_-]+:.*?## .*$$}' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

yarn-install: .PHONY
	yarn

web: ## runs the docs site locally
	yarn dev

crd-docs:
	curl -L https://raw.githubusercontent.com/pluralsh/console/master/go/controller/docs/api.md --output pages/deployments/operator/api.md