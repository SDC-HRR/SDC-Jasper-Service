/* eslint-disable no-console */
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  password: 'postgres',
  port: 5432,
  database: 'games',
});


const getGame = (id, callback) => {
  client.query(`SELECT * FROM gamestable WHERE id=${id}`, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

const postGame = (game, callback) => {
  client.query(`INSERT INTO gamestable VALUES (DEFAULT, '${game.description}', '${game.developer}', '${game.images}', ${game.percentage}, '${game.publisher}', '${game.release_date}', ${game.review_total}, '${game.reviews_general}', '${game.splash}', '${game.tags}', '${game.thumbnails}''${game.title}', '${game.videos}')`, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

client.connect()
  .then(() => console.log('connected!!!!!!!!!!!!!'))
  .catch((err) => console.error(err));

module.exports = {
  getGame,
  postGame,
};
