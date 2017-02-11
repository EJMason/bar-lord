const expect = require('chai').expect
const app = require('../server/server.js')
const barsHelper = require('../server/utilities/barUtil')

var port = 1337
var url = 'http://127.0.0.1:' + port
const request = require('supertest')(url)

describe('Bar App Server', function () {
  it('Should get a valid bar when hitting /bar/getbar/:name', function (done) {
    request
      .get('/bar/getbar/yuriysbar')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(res.body.orders.length).to.equal(2)
      })
      .end(done) //use done to tell mocha that async test is done
  })

  it('Should get a valid bar when passing in a valid bar name', function (done) {
    let barName = 'andrewsbar'
    let bar = barsHelper.getBar(barName)
    expect(bar).to.be.ok
    expect(bar).to.be.an('object')
    expect(bar.name).to.equal('andrewsbar')
    expect(bar.orders.length).to.equal(0)
    done()
  })

  it('Should return undefined when passing in an invalid bar name', function () {
    let barName = 'invalidname'
    let bar = barsHelper.getBar(barName)
    expect(bar).to.be.not.ok
    expect(bar).to.be.an('undefined')
  })
})