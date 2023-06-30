require('dotenv').config()
const express = require('express')
const router = express.Router()
const db = require('../db/index')
const pg = require('pg')

router.get('/', (req, res) => {

    db.query(`
    SELECT workouts.id, workouts.title, workouts.image_url, workouts.difficulty, workouts.user_id, users.username
    FROM workouts
    JOIN users ON workouts.user_id = users.id;`, (err, dbRes) => {

        if (err) {
            console.log(err)
        }
        res.render('home', { workouts: dbRes.rows})
    })
})

module.exports = router