.PHONY: build-cv build update-submodules deploy

build-cv:
	cd cvitae && make build

build:
	npm run build

update-submodules:
	git submodule update --remote

deploy: build-cv
	@echo "cvitae content rebuilt. Review the diff, commit inside cvitae, bump the"
	@echo "submodule pointer here, then push — Netlify builds the site automatically."
