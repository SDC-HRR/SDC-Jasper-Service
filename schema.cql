DROP KEYSPACE IF EXISTS games;

CREATE KEYSPACE games WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};

USE games;

DROP TABLE IF EXISTS gamesTable;

CREATE TABLE gamesTable (
  id int PRIMARY KEY,
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
  videos text,
);
