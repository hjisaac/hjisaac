.PHONY: build-cv build dev update-submodules deploy

build-cv:
	cd cvitae && make build && make schema
	npm run gen:types

build:
	npm run build

dev:
	npm run dev

update-submodules:
	git submodule update --remote

deploy: build-cv
	@echo "cvitae content rebuilt. Review the diff, commit inside cvitae, bump the"
	@echo "submodule pointer here, then push — Netlify builds the site automatically."
