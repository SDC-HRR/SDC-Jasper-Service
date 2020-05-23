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

let id = 10000000;
app.post('/media', (req, res) => {
  id += 1;
  const game = {
    proxyId: id,
    summary: {
      title: 'title',
      splash: 'splash',
      description: 'description',
      reviews: { general: 'general', total: 4 },
      releaseDate: 'release date',
      developer: 'developer',
      publisher: 'publisher',
      tags: ['tags'],
      percentage: 50,
    },
    media: {
      video: [{ video: 'video', thumbnail: 'thumbnail' }],
      images: ['images'],
    },
  };
  db.postGame(game, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/media', (req, res) => {
  const game = req.query;
  console.log(req.body);
  db.putGame({ proxyId: game }, { summary: req.body.summary }, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send(result);
    }
  });
});

app.delete('/media', (req, res) => {
  const game = req.query;
  db.deleteGame({ proxyId: game }, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = app;
