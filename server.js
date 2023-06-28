require('dotenv').config()
const express = require('express')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const pg = require('pg')
const db = require('./db/index')
const session = require('express-session')
const methodOverride = require('method-override')
const port = process.env.PORT || 3000
const app = express()
const indexRouter = require('./routes/index')
const workoutsRouter = require('./routes/workouts')


app.set("view engine", "ejs")

app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

app.use(
    session({
        cookie: {maxAge: 100 * 60 * 60 *24 * 3},
        secret: process.env.SESSION_SECRET || 'mistyrose',
        resave: false, 
        saveUninitialized: true, 
    })
)

app.use(expressLayouts)

app.use('/', indexRouter)
app.use('/workouts', workoutsRouter)




app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

