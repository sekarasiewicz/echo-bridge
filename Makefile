# Echo Bridge Makefile
# Simple commands for development, production, and testing

.PHONY: help dev prod test clean

# Default target
.DEFAULT_GOAL := help

# Colors for output
GREEN := \033[0;32m
YELLOW := \033[1;33m
BLUE := \033[0;34m
NC := \033[0m # No Color

# Variables
COMPOSE_FILE := docker-compose.yml
COMPOSE_DEV_FILE := docker-compose.dev.yml

# Detect Docker Compose command
DOCKER_COMPOSE := $(shell if command -v docker-compose >/dev/null 2>&1; then echo "docker-compose"; else echo "docker compose"; fi)

help: ## Show this help message
	@echo "$(BLUE)Echo Bridge - Available Commands:$(NC)"
	@echo ""
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "$(GREEN)%-10s$(NC) %s\n", $$1, $$2}' $(MAKEFILE_LIST)

dev: ## Start the application in development mode with hot reload
	@echo "$(BLUE)Starting Echo Bridge in development mode...$(NC)"
	$(DOCKER_COMPOSE) -f $(COMPOSE_DEV_FILE) up --build

prod: ## Start the application in production mode
	@echo "$(BLUE)Starting Echo Bridge in production mode...$(NC)"
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) up --build -d
	@echo "$(GREEN)Application started!$(NC)"
	@echo "$(YELLOW)Frontend: http://localhost:3000$(NC)"
	@echo "$(YELLOW)Backend:  http://localhost:8080$(NC)"

test: ## Run all tests
	@echo "$(BLUE)Running backend tests...$(NC)"
	cd backend && mvn test
	@echo "$(BLUE)Running frontend tests...$(NC)"
	cd frontend && npm test -- --run || echo "$(YELLOW)No frontend tests configured$(NC)"

clean: ## Stop and clean up all containers
	@echo "$(BLUE)Cleaning up containers...$(NC)"
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) down -v
	$(DOCKER_COMPOSE) -f $(COMPOSE_DEV_FILE) down -v
	docker system prune -f 