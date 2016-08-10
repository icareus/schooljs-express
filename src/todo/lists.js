// créer une app pour les lists
// GET /todo/lists
// POST /todo/lists
// PUT /todo/lists
// DELETE /todo/lists/:id
import _ from 'lodash'

let id = 1;

let lists = [
  {id: 0, label: 'a test list'},
]

const get = (req, res) => {
  res.json(lists);
}

const post = (req, res) => {
  if (! req.body.todo.label) {
    res.status(400).json(req.body);
    return
  }
  const newList = { label: req.body.todo.label, id }
  id = id + 1;
  lists.push(newList);
  res.json(newList);
}

const put = (req, res) => {
  if (! req.body.todo.label && req.body.todo.id) {
    res.status(400).json(req.body);
    return
  }
  const newlist = {
    id: req.body.todo.id,
    label: req.body.todo.label
  }
  lists = _.map(lists, item => (
    item.id === newlist.id
    ? newlist
    : item
  ))
  res.status(200).json('OK')
}

const remove = (req, res) => {
  lists = _.remove(lists, item => item.id === req.params.id)
  res.status(200).json(req.params.id)
}

export function init(app) {
  app.get('/todo/lists', get);
  app.post('/todo/lists', post);
  app.put('/todo/lists', put);
  app.delete('/todo/lists/:id', remove);
}