require('dotenv').config()
const express = require('express')
const router = express.Router()
const db = require('../db/index')
const bcrypt = require('bcrypt')

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/', (req, res) => {
    let email = req.body.email
    let username = req.body.username
    let plainTextPassword = req.body.password
    let saltRounds = 10
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(plainTextPassword, salt, (err, hash) => {
            if(err){
                console.log(err)
            }
            let sql = `
            INSERT INTO users (email, username, password_digest)
            VALUES ('${email}', '${username}', '${hash}');`
            db.query(sql, (err, dbRes) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('new user created')
                    res.redirect('/login')
                }
            })
        })
    })
    
})




module.exports = router