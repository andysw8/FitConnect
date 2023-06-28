require('dotenv').config()
const express = require('express')
const router = express.Router()
const db = require('../db/index')
const pg = require('pg')

router.get('/', (req, res) => {

    db.query(`SELECT * FROM workouts;`, (err, dbRes) => {

        if (err) {
            console.log(err)
        }
        res.render('home', { workouts: dbRes.rows})
    })
})

module.exports = router