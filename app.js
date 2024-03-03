require('dotenv').config();
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({  });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use((req, res, next) => {
    req.url = req.url.replace(/\[/g, '%5B').replace(/\]/g, '%5D');
    next();
  });

  server.get('/', (req, res) => {
    return app.render(req, res, '/');
  });

  server.get('/about', (req, res) => {
    return app.render(req, res, '/about');
  });

  server.get('/admin', (req, res) => {
    const { page } = req.params;
    return app.render(req, res, '/admin');
  });
  server.get('/admin/:page', (req, res) => {
    const { page } = req.params;
    return app.render(req, res, `/admin/${page}`);
  });


  server.get('/article/:id', (req, res) => {
    const { id } = req.params;
    return app.render(req, res, `/article/${id}`);
  });

  server.get('/tag/:tag', (req, res) => {
    const { tag } = req.params;
    return app.render(req, res, `/tag/${tag}`,);
  });

  server.get('/location/:location', (req, res) => {
    const { location } = req.params;
    return app.render(req, res, `/location/${location}`);
  });

  server.get('/search/:query', (req, res) => {
    const { query } = req.params;
    return app.render(req, res, `/search/${query}`);
  });

  server.get('/login', (req, res) => {
    return app.render(req, res, '/login');
  });

  server.get('/signup', (req, res) => {
    return app.render(req, res, '/signup');
  });

  server.get('/profile', (req, res) => {
    return app.render(req, res, '/profile');
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  const host = process.env.HOST || 'localhost';

  server.listen(port, host, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${host}:${port}`);
  });
});
