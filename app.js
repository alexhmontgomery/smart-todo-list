const express = require('express')
const app = express()
const mustache = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
var models = require('./models')

app.engine('mustache', mustache())
app.set('views', './views') // default
app.set('view engine', 'mustache')

app.use(expressValidator())
app.use(bodyParser.urlencoded({ extended: false }))
app.listen(3000, function () {
  console.log('Go to 0.0.0.0:3000/index')
})

app.get('/', function (req, res) {
  let incomplete = []
  let complete = []

  models.todo.findAll().then(function (todos) {
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].completed === true) {
        complete.push(todos[i])
      } else {
        incomplete.push(todos[i])
      }
    }
  }).then(function () {
    res.render('index', {
      incompletetasks: incomplete,
      completetasks: complete
    })
  })
})

app.post('/', function (req, res) {
  models.todo.create({
    item: req.body.item,
    completed: false
  }).then(function () {
    res.redirect('/')
  })
})

app.post('/completed', function (req, res) {
  models.todo.update({
    completed: true
  }, {
    where: {
      id: req.body.id
    }
  }).then(function () {
    res.redirect('/')
  })
})

app.post('/delete', function (req, res) {
  models.todo.destroy({
    where: {
      id: req.body.id
    }
  }).then(function () {
    res.redirect('/')
  })
})
