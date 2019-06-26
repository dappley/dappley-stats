# dappley-stats
This is a visual interface for monitoring a dappley node's running status.

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
  "NODE_IP": "0.0.0.0",     // proxy requires ip of a node's rpc server; ie. ipconfig getifaddr en0
  "NODE_RPC_PORT": 50050,   // port # of a node's rpc server
  "WEB_SERVER_PORT": 8080,  // webserver runs at http://0.0.0.0:8080
  "POLLING_INTERVAL": 5000, // interval in milliseconds at which to poll a node's rpc server
  "GRPC_PROXY_PORT": 8081   // port # of grpc-proxy for webserver to communicate with node
}
```
Run `cm/gen-config-files.sh`; ie. `./cm/gen-config-files.sh views/default.json`.

### Compiles and hot-reloads for development
```
# start envoy proxy
docker-compose up grpc-proxy

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

### Run your unit tests
```
yarn run test
```

### Run Docker Configuration
```
yarn run docker
```