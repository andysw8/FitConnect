require('dotenv').config()
const express = require('express')
const router = express.Router()
const db = require('../db/index')
const ensureLoggedIn = require('../middlewares/ensure_logged_in')

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/:id', (req, res) => {
  let sql = `SELECT workouts.id, workouts.title, workouts.image_url, workouts.difficulty, workouts.user_id, users.username
    FROM workouts
    JOIN users ON workouts.user_id = users.id
    WHERE workouts.id = $1;`
  db.query(sql, [req.params.id], (err, dbRes) => {
    if (err) {
      console.log(err)
    }
    let workout = dbRes.rows[0];
    res.render('show.ejs', { workout: workout })
  })
})

router.post('/', ensureLoggedIn, (req, res) => {
  let title = req.body.title
  let imageUrl = req.body.image_url
  let userId = req.body.user_id
  let difficulty = req.body.difficulty
  console.log('form data', { title, imageUrl, userId, difficulty })
  const sql = `
    INSERT INTO workouts (title, image_url, user_id, difficulty)
    VALUES ($1, $2, $3, $4)
    RETURNING id;`

  db.query(sql, [title, imageUrl, userId, difficulty], (err, dbRes) => {
    if (err) {
      console.log(err);
    }
    res.redirect(`/workouts/${dbRes.rows[0].id}`);
  })
})

router.get('/:id/edit', ensureLoggedIn, (req, res) => {
  let sql = `SELECT * FROM workouts WHERE id = $1;`;
  db.query(sql, [req.params.id], (err, dbRes) => {
    let workout = dbRes.rows[0]
    res.render('edit', { workout: workout })
  })
})

router.put('/:id', ensureLoggedIn, (req, res) => {
  const sql = `
    UPDATE workouts
    SET title = $1,
    image_url = $2,
    difficulty = $3
    WHERE id = $4;`;

  db.query(sql, [req.body.title, req.body.image_url, req.body.difficulty, req.params.id], (err, dbRes) => {
    res.redirect(`/workouts/${req.params.id}`);
  })
})

router.delete('/:id', ensureLoggedIn, (req, res) => {
  db.query(`DELETE FROM workouts WHERE id = $1;`, [req.params.id], (err, dbRes) => {
    res.redirect('/')
  })
})

module.exports = router