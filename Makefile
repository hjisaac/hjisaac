.PHONY: sync build-cv deploy

sync:
	python3 scripts/sync.py

build-cv:
	cd cvitae && make build

deploy: build-cv sync
	@echo "Ready for deployment!"
