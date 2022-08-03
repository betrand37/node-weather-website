const path = require('path')
const express = require('express')
const { dirname } = require('path')
const hbs = require('hbs')
const { allowedNodeEnvironmentFlags } = require('process')


const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))
console.log(path.join(__dirname, 'views'))

const app = express()




//Define paths  for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

// Setup handlebars engne and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


// app.engine('hbs', require('ejs').renderFile);


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Betrand'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Bibini'
    })
})




// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help me',
        helpText: 'I do not need help my gee God got me',
        name: 'Betrand'
    })
})



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: forecastData
            })
        })

    })


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => (
    res.render('notFound', {
        title: 'help 404',
        name: 'betrand',
        errorMessage: 'Help article not found'
    })
))

app.get('*', (req, res) => {
    res.render('notFound', {
        title: '404',
        name: 'Betrand',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})