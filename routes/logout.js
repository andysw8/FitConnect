const express = require('express')
const router = express.Router()
const db = require('../db')
const bcrypt = require('bcrypt')

router.delete('/', (req, res) => {
    console.log('logging out')
    req.session.userId = undefined
    res.redirect('/')
})

module.exports = router