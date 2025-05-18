#!/bin/bash
# Create snapshot minimal dist folder for deployment

mkdir -p dist-minimal
cp -r adguard/ dist-minimal/adguard
cp -r unbound/ dist-minimal/unbound
cp -r .env.example dist-minimal/
cp docker-compose.prod.yml dist-minimal/docker-compose.yml
cp -r dist/ dist-minimal/ui

mkdir -p dist-minimal/backend
cp api.py store_logs.py realtime_ws.py load_env.py requirements.txt dist-minimal/backend/

echo "Snapshot generated in ./dist-minimal"
