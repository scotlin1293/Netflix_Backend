"use strict";

const db = require("../db");

/** Related functions for users. */

class Movie {
  /** authenticate user with username, password.
   *
   * Returns { username, first_name, last_name, email, is_admin }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async favoriteMovie(id, img, name, username) {
    const duplicateCheck = await db.query(
      `SELECT *
           FROM movies
           WHERE movie_id = $1`,
      [id]
    );

    if (!duplicateCheck.rows[0]) {
      await db.query(
        `INSERT INTO movies
             (movie_id,
              name,img)
             VALUES ($1, $2, $3)`,
        [id, name, img]
      );
    }
    await db.query(
      `INSERT INTO favorites
           (username,
            movie_id)
           VALUES ($1, $2)`,
      [username, id]
    );
  }

  static async unfavoriteMovie(id, username) {
    const duplicateCheck = await db.query(
      `SELECT *
           FROM favorites
           WHERE movie_id = $1 and username = $2`,
      [id, username]
    );

    if (duplicateCheck.rows[0]) {
      await db.query(
        `DELETE FROM favorites WHERE movie_id = $1 and username = $2`,
        [id, username]
      );
    }
  }
}

module.exports = Movie;
