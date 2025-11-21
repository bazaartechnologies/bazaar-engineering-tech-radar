# Makefile for Bazaar Tech Radar

.PHONY: help install serve build deploy clean data update-index

help:
	@echo "Bazaar Tech Radar - Available Commands"
	@echo "========================================"
	@echo ""
	@echo "  make install       - Install dependencies"
	@echo "  make data          - Generate radar data from markdown files"
	@echo "  make update-index  - Update index files with current technologies"
	@echo "  make serve         - Start development server"
	@echo "  make build         - Build static site"
	@echo "  make deploy        - Deploy to GitHub Pages"
	@echo "  make clean         - Remove build artifacts"
	@echo "  make all           - Install, generate data, and serve"
	@echo ""

install:
	@echo "📦 Installing dependencies..."
	pip install -r requirements.txt
	@echo "✅ Installation complete!"

update-index:
	@echo "🔄 Updating index files..."
	python3 update_index_files.py
	@echo "✅ Index files updated!"

data: update-index
	@echo "🔄 Generating radar data..."
	python3 generate_radar_data.py
	@echo "✅ Radar data generated!"

serve: data
	@echo "🚀 Starting development server..."
	@echo "📍 Open http://127.0.0.1:8000 in your browser"
	mkdocs serve

build: data
	@echo "🔨 Building static site..."
	mkdocs build
	@echo "✅ Build complete! Output in site/ directory"

deploy: data
	@echo "🚀 Deploying to GitHub Pages..."
	mkdocs gh-deploy
	@echo "✅ Deployment complete!"

clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf site/
	@echo "✅ Clean complete!"

all: install data serve

# Quick commands
.PHONY: dev quick-deploy

dev: serve

quick-deploy: data deploy

