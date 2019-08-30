# Authorization Server

## Dependencies

- nodejs, yarn

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
// Default Configuration (default.env):
SECRET=                    // base64 encoded secret (ie.  echo "myawesomesecret" | base64)
PORT=8082                  // api port #
NODE_ENV=production        // one of: "production", "development"
LOG_LEVEL=info             // one of: 'log':0, 'trace':1, 'debug':2, 'info':3, 'warn':4, 'error':5, 'fatal':6; https://www.npmjs.com/package/tracer#customize-output-format
DEFAULT_USERNAME=admin     // any string with length > 0
DEFAULT_PASSWORD=password  // any string with length > 0
```

## Documentation

```bash

  # generate documentation
  yarn docgen

  # launch documentation server at http://localhost:9000/docs
  yarn docserver # or yarn docserver <port>
```