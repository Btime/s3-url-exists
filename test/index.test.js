/* eslint-env mocha */
/* eslint node/no-unpublished-require: "off" */

const chai = require('chai')
const expect = chai.expect
require('dotenv').config()

const S3UrlExists = require('../index')
const Mock = require('./mocks')

describe('S3 Url Exists Package Test', () => {
  it('Expect get validate error ', async () => {
    try {
      const response = await S3UrlExists(Mock.invalid)
      expect(response).to.be.equal(undefined)
    } catch (err) {
      expect(typeof err).to.equal('object')
      expect(err.status).to.equal(false)
      expect(Array.isArray(err.errors)).to.equal(true)
      expect(err.errors[0].code).to.equal('ITN-503')
      expect(typeof err.errors[0].path).to.equal('string')
      expect(err.errors[0].path).to.equal('bucket')
      expect(typeof err.errors[0].message).to.equal('string')
      expect(err.errors[1].code).to.equal('ITN-503')
      expect(typeof err.errors[1].path).to.equal('string')
      expect(err.errors[1].path).to.equal('region')
      expect(typeof err.errors[1].message).to.equal('string')
    }
  })

  it('Expect get public url', async () => {
    const response = await S3UrlExists(Mock.valid)

    expect(typeof response).to.be.equal('object')
    expect(response.status).to.be.equal(true)
  })
})
