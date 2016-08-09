// for each request, log timestamp method and url

const notfound = (req, res, next) => {
  res.json({ error: 'not found'})
}

const internal = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
}

export function init(app) {
  app.use(internal, notfound);
}
