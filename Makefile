FRONTEND_DIR=client
BACKEND_DIR=.
COMPOSE=docker-compose

install:
	cd $(FRONTEND_DIR) && pnpm install
	cd $(BACKEND_DIR) && pnpm install

dev-frontend:
	cd $(FRONTEND_DIR) && pnpm dev

dev-backend:
	cd $(BACKEND_DIR) && pnpm dev

lint-frontend:
	cd $(FRONTEND_DIR) && pnpm lint

lint-backend:
	cd $(BACKEND_DIR) && pnpm lint

format-frontend:
	cd $(FRONTEND_DIR) && pnpm format

format-backend:
	cd $(BACKEND_DIR) && pnpm format

build-frontend:
	cd $(FRONTEND_DIR) && pnpm build

build-backend:
	cd $(BACKEND_DIR) && pnpm build

docker-build-frontend:
	docker build -t note-app-frontend $(FRONTEND_DIR)

docker-build-backend:
	docker build -t note-app-backend $(BACKEND_DIR)

docker-run-frontend:
	docker run -p 80:80 note-app-frontend

docker-run-backend:
	docker run -p 3000:3000 note-app-backend

docker-bake:
	docker buildx bake

docker-bake-clean:
	docker buildx bake --no-cache

compose-up:
	$(COMPOSE) up -d --build

compose-down:
	$(COMPOSE) down -v

clean:
	rm -rf $(FRONTEND_DIR)/node_modules $(BACKEND_DIR)/node_modules
	rm -rf $(FRONTEND_DIR)/dist $(BACKEND_DIR)/dist
