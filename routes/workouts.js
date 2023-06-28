require('dotenv').config()
const express = require('express')
const router = express.Router()
const db = require('../db/index')

router.get('/new', (req, res) => {
    res.render('new')
})

router.get('/:id', (req, res) => {
  req.params.id.replace()
    let sql = `SELECT * FROM workouts WHERE id = $1;`
    db.query(sql, [req.params.id], (err, dbRes) => {
        if (err){
            console.log(err)
        }
        let workout = dbRes.rows[0]

        // console.log(workout)

        res.render('show.ejs', { workout: workout })

    })
})



router.post('/', (req, res) => {
    let title = req.body.title
    let imageUrl = req.body.image_url
    const sql = `
    INSERT INTO workouts (title, image_url)
    VALUES ($1, $2)
    returning id;`

    db.query(sql, [title, imageUrl], (err, dbRes) =>{
        res.redirect(`/workouts/${dbRes.rows[0].id}`)
    })
})

router.get('/:id/edit', (req, res) => {
    let sql = `
    SELECT * FROM workouts WHERE id = ${req.params.id}; 
    `
    db.query(sql, (err, dbRes) => {
        let workout = dbRes.rows[0]
        res.render('edit', { workout: workout })
    })
})

router.put('/:id', (req, res) => {
    const sql =`
    UPDATE workouts
    SET title = $1,
    image_url = $2
    WHERE id = $3;`

    db.query(sql, [req.body.title, req.body.image_url, req.params.id], (err, dbRes) => {
        res.redirect(`/workouts/${req.params.id}`)
  
    })
})

router.delete('/:id', (req, res) =>{
    db.query(`DELETE FROM workouts WHERE id = $1;`, [req.params.id], (err, dbRes) => {
        res.redirect('/')
    })
})
module.exports = router