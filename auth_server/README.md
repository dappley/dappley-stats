# Authorization Server

## Dependencies

- nodejs, npm or yarn

## Setup
```bash
yarn install
```

## Development
```bash
# start typescript compiler
yarn run start-compiler
# start auth-server
yarn run start-dev

...

# stop auth-server
yarn stop
```

## Linter
```bash
yarn run lint
```

## Tests
```bash
yarn run test
```

```
// Default Configuration:
{
    "secret"           : "",                   // base64 encoded secret (ie.  echo "myawesomesecret" | base64)
    "port"             : 8082,                 // api port #
    "environment"      : "production",         // one of: "production", "development"
    "logLevel"         : "info"                // one of: 'log':0, 'trace':1, 'debug':2, 'info':3, 'warn':4, 'error':5, 'fatal':6; https://www.npmjs.com/package/tracer#customize-output-format
    "defaultUser"      : "admin",
    "defaultPassword"  : ""
}
```
