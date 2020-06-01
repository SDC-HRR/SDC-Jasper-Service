DROP DATABASE IF EXISTS games;

CREATE DATABASE games;

\c games;

CREATE TABLE gamesTable (
  id SERIAL PRIMARY KEY,
  description text,
  developer text,
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
