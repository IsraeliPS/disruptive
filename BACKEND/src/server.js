const express = require('express');
const apiRouter = require('./routes');
const cors = require('cors');
const path = require('path');

const app = express();

const config = require('./lib/config');

const port = config.app.port;

app.use(cors());

app.use(express.json());

app.use('/static', express.static(path.join(__dirname, '../public')));
// app.use('/static', express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.send(' CHALLENGE FULL STACK - JavaScript 🚀 By Israelí Pérez');
});

apiRouter(app);

module.exports = { app, port };
