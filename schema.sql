DROP DATABASE IF EXISTS games;

CREATE DATABASE games;

\c games;

DROP TABLE IF EXISTS gamesTable;

CREATE TABLE gamesTable (
  description text,
  developer text,
  id int PRIMARY KEY,
  images text,
  percentage int,
  publisher text,
  release_date text,
  review_total int,
  reviews_general text,
  splash text,
  tags text,
  thumbnails text,
  title text,
  videos text
);
