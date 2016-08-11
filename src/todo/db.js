// import util from 'util'
// import Redis from 'ioredis'
import redis from 'redis'
import async from 'async'

const client = redis.createClient()

const getListsFromKeys = (listKeys, cb) => {
  async.map(listKeys,
    (key, cb) => client.hgetall(key, cb),
    cb)
}

const getLists = cb => {
  async.waterfall([
    cb => client.smembers('lists', cb),
    getListsFromKeys,
  ], cb)
}

const genNewList = label => (id, cb) => {
  client.hmset(`lists:${id}`, 'id', id, 'label', label,
    (err, res) => {
      err
      ? cb(err)
      : cb(null, {id, label})
    })
}

const registerList = (list, cb) => {
  client.sadd('lists', `lists:${list.id}`,
    (err, res) => {
      err
      ? cb(err)
      : cb(null, list)
    })
}

const postList = (label, cb) => {
  async.waterfall([
    cb => client.incr('lastId', cb),
    genNewList(label),
    registerList
  ], cb)
}

const delList = (id, cb) => {
  async.waterfall([
    cb => client.del(`lists:${id}`, (err, res) => cb(err, res)),
    cb => client.srem('lists', `lists:${id}`, cb),
  ], (err, res) => (console.log(err, res), cb(err, res)))
}

const odm = {
  getLists,
  postList,
  delList,
}

export default odm
