# docker-test

run following commands in main folder:

1. docker-compose up -d
2. cd main
3. docker build -t main .
4. docker run -d -v //var/run/docker.sock:/var/run/docker.sock -p 3000:3000 main

UI
```
localhost:3000/
```

API
```
GET localhost:3000/api/containers - list containers
POST localhost:3000/api/containers/:containerId/logs - link container logs
GET localhost:3000/api/containers/:containerId/logs - get container logs
DELETE localhost:3000/api/containers/:containerId/logs - unlink container logs
```
