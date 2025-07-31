# Echo Bridge Makefile
# A comprehensive Makefile for managing the Echo Bridge application

.PHONY: help build run dev test clean logs stop down prune install-backend install-frontend lint type-check

# Default target
.DEFAULT_GOAL := help

# Colors for output
GREEN := \033[0;32m
YELLOW := \033[1;33m
RED := \033[0;31m
BLUE := \033[0;34m
NC := \033[0m # No Color

# Variables
COMPOSE_FILE := docker-compose.yml
COMPOSE_DEV_FILE := docker-compose.dev.yml
BACKEND_DIR := backend
FRONTEND_DIR := frontend

# Detect Docker Compose command
DOCKER_COMPOSE := $(shell if command -v docker-compose >/dev/null 2>&1; then echo "docker-compose"; else echo "docker compose"; fi)

help: ## Show this help message
	@echo "$(BLUE)Echo Bridge - Available Commands:$(NC)"
	@echo ""
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "$(GREEN)%-20s$(NC) %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo ""
	@echo "$(YELLOW)Examples:$(NC)"
	@echo "  make run          # Start the application in production mode"
	@echo "  make dev          # Start the application in development mode"
	@echo "  make test         # Run all tests"
	@echo "  make clean        # Clean up Docker resources"

# =============================================================================
# DOCKER COMPOSE COMMANDS
# =============================================================================

build: ## Build all Docker images
	@echo "$(BLUE)Building Docker images...$(NC)"
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) build

build-dev: ## Build development Docker images
	@echo "$(BLUE)Building development Docker images...$(NC)"
	$(DOCKER_COMPOSE) -f $(COMPOSE_DEV_FILE) build

run: ## Start the application in production mode
	@echo "$(BLUE)Starting Echo Bridge in production mode...$(NC)"
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) up --build -d
	@echo "$(GREEN)Application started!$(NC)"
	@echo "$(YELLOW)Frontend: http://localhost:3000$(NC)"
	@echo "$(YELLOW)Backend:  http://localhost:8080$(NC)"
	@echo "$(YELLOW)Health:   http://localhost:8080/api/health$(NC)"

dev: ## Start the application in development mode with hot reload
	@echo "$(BLUE)Starting Echo Bridge in development mode...$(NC)"
	$(DOCKER_COMPOSE) -f $(COMPOSE_DEV_FILE) up --build
	@echo "$(GREEN)Development server started!$(NC)"
	@echo "$(YELLOW)Frontend: http://localhost:3000 (with hot reload)$(NC)"
	@echo "$(YELLOW)Backend:  http://localhost:8080 (with hot reload)$(NC)"

logs: ## Show logs from all services
	@echo "$(BLUE)Showing logs...$(NC)"
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) logs -f

logs-backend: ## Show backend logs
	@echo "$(BLUE)Showing backend logs...$(NC)"
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) logs -f backend

logs-frontend: ## Show frontend logs
	@echo "$(BLUE)Showing frontend logs...$(NC)"
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) logs -f frontend

stop: ## Stop all services
	@echo "$(BLUE)Stopping services...$(NC)"
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) stop
	$(DOCKER_COMPOSE) -f $(COMPOSE_DEV_FILE) stop

down: ## Stop and remove containers, networks
	@echo "$(BLUE)Stopping and removing containers...$(NC)"
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) down
	$(DOCKER_COMPOSE) -f $(COMPOSE_DEV_FILE) down

down-volumes: ## Stop and remove containers, networks, and volumes
	@echo "$(BLUE)Stopping and removing containers with volumes...$(NC)"
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) down -v
	$(DOCKER_COMPOSE) -f $(COMPOSE_DEV_FILE) down -v

restart: ## Restart all services
	@echo "$(BLUE)Restarting services...$(NC)"
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) restart

# =============================================================================
# LOCAL DEVELOPMENT COMMANDS
# =============================================================================

install-backend: ## Install backend dependencies
	@echo "$(BLUE)Installing backend dependencies...$(NC)"
	cd $(BACKEND_DIR) && ./mvnw clean install -DskipTests

install-frontend: ## Install frontend dependencies
	@echo "$(BLUE)Installing frontend dependencies...$(NC)"
	cd $(FRONTEND_DIR) && npm install

install: install-backend install-frontend ## Install all dependencies

run-backend: ## Run backend locally
	@echo "$(BLUE)Starting backend locally...$(NC)"
	cd $(BACKEND_DIR) && ./mvnw spring-boot:run

run-frontend: ## Run frontend locally
	@echo "$(BLUE)Starting frontend locally...$(NC)"
	cd $(FRONTEND_DIR) && npm run dev

# =============================================================================
# TESTING COMMANDS
# =============================================================================

test: test-backend test-frontend ## Run all tests

test-backend: ## Run backend tests
	@echo "$(BLUE)Running backend tests...$(NC)"
	cd $(BACKEND_DIR) && ./mvnw test

test-frontend: ## Run frontend tests
	@echo "$(BLUE)Running frontend tests...$(NC)"
	cd $(FRONTEND_DIR) && npm test

test-docker: ## Run tests in Docker containers
	@echo "$(BLUE)Running tests in Docker...$(NC)"
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) exec backend mvn test
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) exec frontend npm test

# =============================================================================
# CODE QUALITY COMMANDS
# =============================================================================

lint: lint-backend lint-frontend ## Run all linting

lint-backend: ## Lint backend code
	@echo "$(BLUE)Linting backend code...$(NC)"
	cd $(BACKEND_DIR) && ./mvnw spotless:check

lint-frontend: ## Lint frontend code
	@echo "$(BLUE)Linting frontend code...$(NC)"
	cd $(FRONTEND_DIR) && npm run lint

type-check: ## Run TypeScript type checking
	@echo "$(BLUE)Running TypeScript type check...$(NC)"
	cd $(FRONTEND_DIR) && npm run type-check

format: format-backend format-frontend ## Format all code

format-backend: ## Format backend code
	@echo "$(BLUE)Formatting backend code...$(NC)"
	cd $(BACKEND_DIR) && ./mvnw spotless:apply

format-frontend: ## Format frontend code
	@echo "$(BLUE)Formatting frontend code...$(NC)"
	cd $(FRONTEND_DIR) && npm run format

# =============================================================================
# CLEANUP COMMANDS
# =============================================================================

clean: clean-docker clean-local ## Clean everything

clean-docker: ## Clean Docker resources
	@echo "$(BLUE)Cleaning Docker resources...$(NC)"
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) down -v --remove-orphans
	$(DOCKER_COMPOSE) -f $(COMPOSE_DEV_FILE) down -v --remove-orphans
	docker system prune -f

clean-local: ## Clean local build artifacts
	@echo "$(BLUE)Cleaning local build artifacts...$(NC)"
	cd $(BACKEND_DIR) && ./mvnw clean
	cd $(FRONTEND_DIR) && rm -rf node_modules dist

prune: ## Remove unused Docker resources
	@echo "$(BLUE)Removing unused Docker resources...$(NC)"
	docker system prune -a -f

# =============================================================================
# UTILITY COMMANDS
# =============================================================================

status: ## Show status of all services
	@echo "$(BLUE)Service Status:$(NC)"
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) ps
	@echo ""
	@echo "$(BLUE)Health Checks:$(NC)"
	@curl -s http://localhost:8080/api/health || echo "$(RED)Backend not responding$(NC)"
	@curl -s http://localhost:3000/health || echo "$(RED)Frontend not responding$(NC)"

shell-backend: ## Open shell in backend container
	@echo "$(BLUE)Opening shell in backend container...$(NC)"
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) exec backend sh

shell-frontend: ## Open shell in frontend container
	@echo "$(BLUE)Opening shell in frontend container...$(NC)"
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) exec frontend sh

api-test: ## Test the API endpoints
	@echo "$(BLUE)Testing API endpoints...$(NC)"
	@echo "$(YELLOW)Testing health endpoint:$(NC)"
	@curl -s http://localhost:8080/api/health || echo "$(RED)Health check failed$(NC)"
	@echo ""
	@echo "$(YELLOW)Testing echo endpoint:$(NC)"
	@curl -s -X POST http://localhost:8080/api/echo \
		-H "Content-Type: application/json" \
		-d '{"message": "Hello from Makefile!"}' || echo "$(RED)Echo test failed$(NC)"

# =============================================================================
# DEPLOYMENT COMMANDS
# =============================================================================

build-prod: ## Build production images
	@echo "$(BLUE)Building production images...$(NC)"
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) build --no-cache

push: ## Push images to registry (requires registry configuration)
	@echo "$(BLUE)Pushing images to registry...$(NC)"
	@echo "$(YELLOW)Note: Configure your registry before using this command$(NC)"
	# $(DOCKER_COMPOSE) -f $(COMPOSE_FILE) push

# =============================================================================
# MONITORING COMMANDS
# =============================================================================

monitor: ## Monitor application resources
	@echo "$(BLUE)Monitoring application resources...$(NC)"
	@echo "$(YELLOW)Container Stats:$(NC)"
	docker stats --no-stream
	@echo ""
	@echo "$(YELLOW)Disk Usage:$(NC)"
	docker system df

# =============================================================================
# BACKUP AND RESTORE
# =============================================================================

backup: ## Create backup of application data
	@echo "$(BLUE)Creating backup...$(NC)"
	@mkdir -p backups
	@$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) exec backend tar -czf /tmp/backup-$(shell date +%Y%m%d-%H%M%S).tar.gz /app/logs || echo "$(YELLOW)No data to backup$(NC)"

# =============================================================================
# DEVELOPMENT HELPERS
# =============================================================================

watch: ## Watch for file changes and restart services
	@echo "$(BLUE)Watching for changes...$(NC)"
	@echo "$(YELLOW)Use 'make dev' for hot reload instead$(NC)"

setup: install build ## Complete setup: install dependencies and build images
	@echo "$(GREEN)Setup complete! Run 'make run' to start the application$(NC)"

# =============================================================================
# DOCUMENTATION
# =============================================================================

docs: ## Generate documentation
	@echo "$(BLUE)Generating documentation...$(NC)"
	@echo "$(YELLOW)Backend documentation available in backend/README.md$(NC)"
	@echo "$(YELLOW)Frontend documentation available in frontend/README.md$(NC)"
	@echo "$(YELLOW)API documentation available in backend/README.md$(NC)"

# =============================================================================
# TROUBLESHOOTING
# =============================================================================

debug: ## Show debug information
	@echo "$(BLUE)Debug Information:$(NC)"
	@echo "$(YELLOW)Docker version:$(NC)"
	@docker --version
	@echo "$(YELLOW)Docker Compose version:$(NC)"
	@$(DOCKER_COMPOSE) --version
	@echo "$(YELLOW)Java version:$(NC)"
	@java -version 2>/dev/null || echo "$(RED)Java not found$(NC)"
	@echo "$(YELLOW)Node version:$(NC)"
	@node --version 2>/dev/null || echo "$(RED)Node not found$(NC)"
	@echo "$(YELLOW)Maven version:$(NC)"
	@mvn --version 2>/dev/null || echo "$(RED)Maven not found$(NC)"

reset: down-volumes clean build run ## Complete reset: clean, rebuild, and restart
	@echo "$(GREEN)Reset complete! Application is running$(NC)" 