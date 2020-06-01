require('newrelic');

const express = require('express');
const parser = require('body-parser');
const path = require('path');


const app = express();
const db = require('../database/config.js');

app.use(parser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/media', (req, res) => {
  const game = req.query.id;
  console.log(game);
  const callback = (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const { rows } = data;
      // adding it as an array was an arbitrary fix for how the front end expects the data
      const JSONData = [
        {
          summary: {
            title: rows[0].title,
            splash: rows[0].splash,
            description: rows[0].description,
            reviews: {
              general: rows[0].reviews_general,
              total: rows[0].review_total,
            },
            releaseDate: rows[0].release_date,
            developer: rows[0].developer,
            publisher: rows[0].publisher,
            tags: rows[0].tags.slice(1, rows[0].tags.length - 1).split(','),
          },
          media: {
            video: rows[0].videos.slice(1, rows[0].videos.length - 1)
              .split(',')
              .map((item, index) => ({
                video: item,
                thumbnail: rows[0].thumbnails.slice(1, rows[0].thumbnails.length - 1).split(',')[index],
              })),
            images: rows[0].images.slice(1, rows[0].images.length - 1)
              .split(','),
          },
        },
      ];
      res.status(200).json(JSONData);
    }
  };
  db.getGame(game, callback);
});

// let id = 10000000;
app.post('/media', (req, res) => {
  const game = {
    description: 'Odit est voluptate suscipit nobis qui omnis inventore dolorem. Adipisci deleniti enim est omnis pariatur veniam. Consequuntur quidem eum dicta explicabo. Sit fugiat laborum similique quod nam quasi enim fugit. Beatae unde soluta vel id et eos asperiores hic.',
    developer: 'Hudson - Moen',
    images: '[https://fecpictures.s3.us-east-2.amazonaws.com/pics/10.jpg,https://fecpictures.s3.us-east-2.amazonaws.com/pics/8.jpg]',
    percentage: 82,
    publisher: 'Schamberger and Sons',
    release_date: 'Sat Jul 27 2019 04:03:06 GMT-0500 (Central Daylight Time)',
    review_total: 98959,
    reviews_general: 'Positive',
    splash: 'https://fecpictures.s3.us-east-2.amazonaws.com/pics/17.jpg',
    tags: '[virtual,granular,leading-edge,holistic,B2B,sticky,e-business,cross-platform,bricks-and-clicks,best-of-breed,one-to-one,virtual,real-time,robust,cross-media,clicks-and-mortar,front-end,sticky,integrated,24/7]',
    thumbnails: '[https://i.ytimg.com/vi/-gsXevAjNbw/mqdefault.jpg]',
    title: 'Sleek Soft Gloves',
    videos: '[https://www.youtube.com/embed/-gsXevAjNbw]',
  };
  db.postGame(game, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send(result);
    }
  });
});

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
