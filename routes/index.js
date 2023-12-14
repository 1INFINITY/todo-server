const express = require('express');
const router = express.Router();

const todosRoute = require('./todoitems');
const serverRoute = require('./server');

module.exports = (params) => {

  router.get('/', (req, res) => {
    res.send('Home Page');
  });

  router.use('/todo', todosRoute(params.postgresClient));

  router.use('/server', serverRoute());

  return router;
};