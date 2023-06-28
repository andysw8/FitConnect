require('dotenv').config()
const express = require('express')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const pg = require('pg')
const db = require('./db/index')
const session = require('express-session')
const port = process.env.PORT || 3000
const app = express()


app.set("view engine", "ejs")
app.use(expressLayouts)

app.use(
    session({
        cookie: {maxAge: 100 * 60 * 60 *24 * 3},
        secret: process.env.SESSION_SECRET || 'mistyrose',
        resave: false, 
        saveUninitialized: true, 
    })
)

app.get('/', (req, res) => {
    db.query(`SELECT * FROM workouts;`, (err, dbRes) => {
        if (err) {
            console.log(err)
        }
        res.render('home', { workouts: dbRes.rows})
    })
})

app.get('/workout', (req, res) => {
    res.render('show')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

