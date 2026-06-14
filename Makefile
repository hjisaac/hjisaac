.PHONY: sync build-cv

sync:
	python3 scripts/sync.py

build-cv:
	cd data/cvitae && make build

deploy: build-cv sync
	@echo "Ready for deployment!"
