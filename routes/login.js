const express = require('express')
const router = express.Router()
const db = require('../db')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', (req, res) => {
    let email = req.body.email
    let password = req.body.password
  
    let sql = `SELECT * FROM users WHERE email = '${email}';`
  
    db.query(sql, (err, dbRes) => {
      if (err) {
        console.log(err)
        res.redirect('/login')
        return
      }
  
      if (dbRes.rows.length === 0) {
        res.redirect('/login')
        return
      }
  
      let user = dbRes.rows[0]
      bcrypt.compare(password, user.password_digest, (err, result) => {
        if (result) {
          req.session.userId = user.id
          res.redirect('/')
        } else {
          res.redirect('/login')
        }
      })
    })
  })


router.delete('/logout', (req, res) => {
    req.session.userId = undefined
    res.redirect('/')
})

module.exports = router