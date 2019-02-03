const { getRequestForFiveDays } = require('../testing/weatherFiveDays')

let responseForFiveDays

let todaysDate = new Date().toUTCString()
console.log('Current UTC time:', todaysDate)

beforeAll(async () => {
  responseForFiveDays = await getRequestForFiveDays().catch(err => console.error(err))
}, 30000)
  
  describe('When I look up the weather forecast', () => {
    it('Then I receive the weather forecast', () => {
      expect(responseForFiveDays.statusCode).toBe(200)
    })
  })
  describe('Given I like to holiday in Sydney', () => {
    it('should be Sydney', () => {
      expect(responseForFiveDays.body.city.name).toBe('Sydney')
    })
  })
  describe('And I only like to holiday on Thursdays and temperature is warmer than 10 degrees', () => {
    it('should be a thursday and temp greater than 10 degrees', () => {
      let listFiveDaysWeather = responseForFiveDays.body.list
      listFiveDaysWeather.forEach(elementInList => {
        let date = elementInList.dt_txt
        let day = (new Date(date)).getDay()
        if (day==4){ // 4 here signifies Thursday
          tempInCelsius= elementInList.main.temp_min-273.15 //Convert Kelvin to Celsius
          expect(tempInCelsius).toBeGreaterThan(10)
        }
      })
    })
  })