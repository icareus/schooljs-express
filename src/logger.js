// for each request, log timestamp method and url
export function init(app) {
  app.use((req, res, next) => {
    console.log(`${Date.now()}::${req.method}::${req.url}`);
    next();
  })
}
