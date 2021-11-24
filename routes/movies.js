"use strict";

/** Routes for authentication. */

const Movie = require("../models/movies");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const { ensureLoggedIn } = require("../middleware/auth");

/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const { img, name, id } = req.body;
    console.log({ img, name, id });
    await Movie.favoriteMovie(id, img, name, res.locals.user.username);
    return res.json({ status: "Movie Favorited" });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    const movie_id = req.params.id;
    await Movie.unfavoriteMovie(movie_id, res.locals.user.username);
    return res.json({ status: "Movie Unfavorited" });
  } catch (err) {
    return next(err);
  }
});

router.get("/", ensureLoggedIn, async function (req, res, next) {
  try {
    let movies = await Movie.getAllforUser(res.locals.user.username);
    return res.json({ movies });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
