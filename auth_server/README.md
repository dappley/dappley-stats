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
    "logLevel"         : "info"                // one of: "error", "warn", "info", "verbose", "debug", "silly"; https://github.com/winstonjs/winston#logging
    "defaultUser"      : "admin",
    "defaultPassword"  : ""
}
```
