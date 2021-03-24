const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  const now = new Date();
  if (req.method === 'POST') {
    req.body.createdAt = now;
  } else if (req.method === 'PUT') {
    req.body.updatedAt = now;
  }
  next();
});

server.use(router);
server.listen(9000, () => {
  console.log('JSON Server is running');
});
