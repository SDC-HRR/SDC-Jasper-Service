const express = require('express');
const parser = require('body-parser');
const path = require('path');

const app = express();
const db = require('../database/config.js');

app.use(parser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/media', (req, res) => {
  const game = req.query.proxyId;
  console.log(game);
  const callback = (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      // adding it as an array was an arbitrary fix for how the front end expects the data
      const JSONData = [
        {
          summary: {
            title: data.rows[0].title,
            splash: data.rows[0].splash,
            description: data.rows[0].description,
            reviews: {
              general: data.rows[0].reviews_general,
              total: data.rows[0].review_total,
            },
            releaseDate: data.rows[0].release_date,
            developer: data.rows[0].developer,
            publisher: data.rows[0].publisher,
            tags: data.rows[0].tags.slice(1, data.rows[0].tags.length - 1).split(','),
          },
          media: {
            video: data.rows[0].videos.slice(1, data.rows[0].videos.length - 1).split(',').map((item, index) => ({ video: item, thumbnail: data.rows[0].thumbnails.slice(1, data.rows[0].thumbnails.length - 1).split(',')[index] })),
            images: data.rows[0].images.slice(1, data.rows[0].images.length - 1).split(','),
          },
        },
      ];
      res.status(200).json(JSONData);
    }
  };
  db.getGame(game, callback);
});

// let id = 10000000;
// app.post('/media', (req, res) => {
//   id += 1;
//   const game = {
//     proxyId: id,
//     summary: {
//       title: 'title',
//       splash: 'splash',
//       description: 'description',
//       reviews: { general: 'general', total: 4 },
//       releaseDate: 'release date',
//       developer: 'developer',
//       publisher: 'publisher',
//       tags: ['tags'],
//       percentage: 50,
//     },
//     media: {
//       video: [{ video: 'video', thumbnail: 'thumbnail' }],
//       images: ['images'],
//     },
//   };
//   db.postGame(game, (err, result) => {
//     if (err) {
//       console.error(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

// app.put('/media', (req, res) => {
//   const game = req.query;
//   console.log(req.body);
//   db.putGame({ proxyId: game }, { summary: req.body.summary }, (err, result) => {
//     if (err) {
//       console.error(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

// app.delete('/media', (req, res) => {
//   const game = req.query;
//   db.deleteGame({ proxyId: game }, (err, result) => {
//     if (err) {
//       console.error(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

module.exports = app;
