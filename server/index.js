const express = require('express');
const parser = require('body-parser');
const path = require('path');

const app = express();
const db = require('../database/config.js');

app.use(parser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/media', (req, res) => {
  const game = req.query;
  const callback = (err, data) => {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(200).json(data);
    }
  };
  db.getGame(game, callback);
});

app.post('/media', (req, res) => {
  res.sendStatus(200);
});

app.put('/media', (req, res) => {
  res.sendStatus(200);
});

app.delete('/media', (req, res) => {
  res.sendStatus(200);
});

module.exports = app;
