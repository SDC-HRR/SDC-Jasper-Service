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

client.connect()
  .then(() => console.log('connected!!!!!!!!!!!!!'))
  .catch((err) => console.error(err));

module.exports = {
  getGame,
};
