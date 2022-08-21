const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude


    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' with a ' + body.daily.data[0].temperatureLow + ' It is currently ' + response.body.currently.temperature + ' degrees out. The high is ' + body.daily.data[0].temperatureHigh + 'There is a ' + response.body.currently.precipProbability + '% chance 0f rain')
        }
    })

}