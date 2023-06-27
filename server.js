const express = require('express')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const pg = require('pg')
const db = require('./db/index')

const port = 3000
const app = express()


app.set("view engine", "ejs")
app.use(expressLayouts)

app.get('/', (req, res) => {
    db.query(`SELECT * FROM workouts;`, (err, dbRes) => {
        if (err) {
            console.log(err)
        }
        res.render('home', { workouts: dbRes.rows})
    })
    res.render('home')
})

app.get('/workout', (req, res) => {
    res.render('show')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})