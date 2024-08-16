docker-compose -f docker-build/docker-compose.yml down --rmi all -v --remove-orphans
del node_modules
del package-lock.json
docker-compose -f docker-build/docker-compose.yml up -d