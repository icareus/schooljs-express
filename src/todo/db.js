// import util from 'util'
// import Redis from 'ioredis'
import redis from 'redis'
import async from 'async'

const client = redis.createClient()

const getListKeys = cb => {
  client.smembers('lists', cb);
}

const getListsFromKeys = (listKeys, cb) => {
  console.log(listKeys)
  async.map(listKeys,
    (key, cb) => client.hgetall(key, cb),
    cb)
}

const getLists = cb => {
  async.waterfall([
    getListKeys,
    getListsFromKeys,
  ], (err, data) => (console.log(data), cb(err, data)))
}

const odm = {
  getLists,
}

export default odm
