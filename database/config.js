/* eslint-disable no-console */
const mongoose = require('mongoose');

const db = mongoose.connection;

mongoose.connect('mongodb://localhost/mediaDb', { useNewUrlParser: true });

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to db');
});

const gameSchema = new mongoose.Schema({
  proxyId: Number,
  summary: {
    title: String,
    splash: String,
    description: String,
    reviews: { general: String, total: Number },
    releaseDate: String,
    developer: String,
    publisher: String,
    tags: [String],
    percentage: Number,
  },
  media: {
    video: [{ video: String, thumbnail: String }],
    images: [String],
  },
});

const Game = mongoose.model('Game', gameSchema);

module.exports.addNewGame = (game, cb) => {
  const newGame = new Game(game);
  // eslint-disable-next-line no-shadow
  newGame.save((err, newGame) => {
    if (err) {
      cb(err);
    } else {
      cb(null, newGame);
    }
  });
};

module.exports.getGame = (game, cb) => {
  Game.find({ proxyId: game.proxyId }, (err, data) => {
    if (err) {
      cb(err);
    } else {
      cb(null, data);
    }
  });
};

module.exports.postGame = (game, cb) => {
  Game.insert(game, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result);
    }
  });
};

module.exports.deleteGame = (obj, cb) => {
  Game.deleteOne(obj, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(result);
    }
  });
};

module.exports.putGame = (search, obj, cb) => {
  Game.updateOne(search, obj, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result);
    }
  });
};

module.exports.deleteGame = (obj, cb) => {
  Game.deleteOne(obj, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result);
    }
  });
};
