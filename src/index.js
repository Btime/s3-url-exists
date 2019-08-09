const { pick } = require('lodash')
const request = require('request-promise')
const { validate } = require('./validate')

const DEFAULT_PICK_FIELDS = [
  'bucket',
  'region',
  'key'
]

const defineUri = (params) => {
  return `
    https://s3-${params.region}.amazonaws.com/${params.bucket}/${params.key}
  `.trim()
}

module.exports.default = async function S3UrlExists (options) {
  const params = pick(options, DEFAULT_PICK_FIELDS)
  validate(params)

  const uri = defineUri(params)

  return request({
    method: 'GET',
    uri,
    resolveWithFullResponse: true
  }).then((response) => {
    return { status: response.statusCode === 200, url: uri }
  })
    .catch(errs => {
      const err = { status: false, errors: defineErr(errs) }
      throw err
    })
}

function defineErr (err) {
  if (!err.errors && Array.isArray(err)) return err

  if (!err.errors && !Array.isArray(err)) return [ err ]

  return Array.isArray(err.errors)
    ? err.errors
    : [ err.errors ]
}
