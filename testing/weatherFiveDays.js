const request = require('supertest')('api.openweathermap.org/data/2.5/forecast')

require('dotenv').config()

function getRequestForFiveDays() {
    try {
      let data
      const cityName ='Sydney'
      const appid = process.env.API_KEY
      return data = request.get(`?q=${cityName}&appid=${appid}`)
    } catch (error) {
      throw Error(error)
    }
  }

  module.exports = {
    getRequestForFiveDays,
  }