// créer une app pour les lists
// GET /todo/lists
// POST /todo/lists
// PUT /todo/lists
// DELETE /todo/lists/:id
import _ from 'lodash'
import async from 'async'

import db from './db'

// const redis = Redis()

let id = 3;

let lists = [
  {id: 0, label: 'a test list'},
  {id: 1, label: 'second test'},
  {id: 2, label: 'test three'},
]

const get = (req, res) => {
  db.getLists((err, lists) => res.status(200).json(lists))
  // res.json(lists);
}

const post = (req, res) => {
  if (! req.body.todo.label) { return res.status(400).json(req.body) }
  db.postList(req.body.todo.label, (err, list) => res.status(200).json(list))
}

const put = (req, res, next) => {
  const newlist = {
    id: req.body.todo.id,
    label: req.body.todo.label
  }
  if (! newlist.label && newlist.id) {
    // return next({status: 400, message: req.body}) -> TODO
    return res.status(400).json(req.body);
  }
  lists = _.map(lists, item => (
    item.id === newlist.id
    ? newlist
    : item
  ))
  res.status(200).json('OK')
}

const remove = (request, response) => {
  db.delList(request.params.id, (err, res) => response.status(200).json({id: res}))
}

export function init(app) {
  // redis.get(lists).then(lists => _.map())
  app.get('/todo/lists', get);
  app.post('/todo/lists', post);
  app.put('/todo/lists', put);
  app.delete('/todo/lists/:id', remove);
}
