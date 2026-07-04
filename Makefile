.PHONY: sync build-cv validate deploy

sync:
	python3 scripts/sync.py

validate:
	python3 scripts/validate_content.py

build-cv:
	cd cvitae && make build

deploy: build-cv sync validate
	@echo "Ready for deployment!"
