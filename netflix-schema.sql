CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1)
);

CREATE TABLE movies (
  movie_id INT PRIMARY KEY,
  name TEXT NOT NULL,
  img TEXT NOT NULL
);

CREATE TABLE favorites (
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  movie_id INTEGER
    REFERENCES movies ON DELETE CASCADE,
  PRIMARY KEY (username, movie_id)
);
