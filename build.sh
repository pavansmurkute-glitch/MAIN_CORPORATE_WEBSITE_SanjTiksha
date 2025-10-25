#!/bin/bash
set -e

echo "Installing dependencies..."
npm install

echo "Building project..."
npm run build

echo "Checking if dist directory exists..."
if [ -d "dist" ]; then
    echo "✅ dist directory found"
    ls -la dist/
else
    echo "❌ dist directory not found"
    echo "Current directory contents:"
    ls -la
    exit 1
fi

echo "Build completed successfully!"
