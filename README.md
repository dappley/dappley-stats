# dappley-stats
This is a visual interface for monitoring a dappley node's running status.

[![Build Status](https://travis-ci.com/dappley/dappley-stats.svg?branch=master)](https://travis-ci.com/dappley/dappley-stats)

## Dependencies
- bash shell
- docker
- docker-compose
- node, npm or yarn

## Project setup
```
yarn install
```

Create or modify a configuration file similar to `default.json` in `cm/views`

```
Default Config:
{
  // ONLY ONE OF "NODE.IP" or "NODE.DOCKER_HOSTNAME / NODE.DOCKER_NETWORK" (offline usage) is required; the former gets precedence
  "NODE": {
    "DOCKER_HOSTNAME"  : "dappley",            // hostname of the node's docker container
    "DOCKER_NETWORK"   : "go-dappley_default"  // the network the docker container is connected to
    "IP"               : "0.0.0.0",            // proxy requires ip of a node's rpc server; ie. ipconfig getifaddr en0
    "RPC_PORT"         : 50050,                // port # of a node's rpc server
  },
  "AUTH_SERVER": {
    "IP"               : "0.0.0.0",            // ip of the auth-server (ie. use, ipconfig getifaddr en0, to run locally for debugging)
    "PORT"             : 8082,                 // port # of auth-server for user authorization
    "SECRET"           : "",                   // base64 encoded secret for jwt authentication (ie.  echo "myawesomesecret" | base64)
    "DEFAULT_USER"     : "admin"               // any string with length > 0
    "DEFAULT_PASS"     : ""                    // any string with length > 0
  },
  "WEB_SERVER_PORT"    : 8080,                 // webserver runs at http://0.0.0.0:8080
  "POLLING_INTERVAL"   : 5000,                 // interval in milliseconds at which to poll a node's rpc server
  "GRPC_PROXY_PORT"    : 8081                  // port # of grpc-proxy for webserver to communicate with node
}
```

Note: For offline deployment, build the docker images on a host with internet and see,
[docker-save](https://docs.docker.com/engine/reference/commandline/save/) and
[docker-load](https://docs.docker.com/engine/reference/commandline/load/) for packaging/installation.

Run `cm/gen-config-files.sh`; ie. `./cm/gen-config-files.sh views/default.json`.

### Compiles and hot-reloads for development
```
# start envoy proxy & authorization server
docker-compose up grpc-proxy auth-server

# start webserver
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

### Run unit tests
```
yarn run test
```

### Run Docker Configuration
```
yarn run docker-build
docker-compose up
```

### Authorize additional users
```bash
# From auth-server
# ie. docker exec -it auth-server bash

# add user
read -s PASSWORD
node scripts/AddOrRemoveUser add <username> ${PASSWORD}

# remove user
node scripts/AddOrRemoveUser remove <username>
```
