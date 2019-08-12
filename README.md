# S3-URL-EXISTS

![npm](https://img.shields.io/badge/npm-v5.6.1-blue.svg) ![node](https://img.shields.io/badge/node-v8.9.0-brightgreen.svg)

## About

S3 Url Exists is an abstraction package made to check if the key into the buckets really exist and it's public

### Usage

```bash
$ npm i Btime/s3-url-exists#semver:^1 -S
```

### Example

```js
const S3UrlExists = require('s3-url-exists')
const options = {
  region: 'sa-east-1',
  bucket: 'bucket-name',
  key: 'file-name'
}

S3UrlExists(options)
  .then((result) => {
    /*
    * { status: true, url: 'https://s3-region.amazonaws.com/bucket-name/file-name' }
    */
  })
  .catch(err => {
    /*
    * Request Error
    */
  })
```

## Tests

- Create `.env` file:

```bash
$ cp .env .env.dist
```

- Run tests:
```bash
$ npm test
```
