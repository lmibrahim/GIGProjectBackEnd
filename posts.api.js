"use strict";

// require the Express module
const express = require("express");
// Creates an new router object
const posts = express.Router();

const pool = require("./connection");

posts.post("/posts/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let query =
    "INSERT INTO posts (memo, poster, post, show_id) VALUES ($1::varchar, $2::varchar, $3::text, $4::smallint)";
  pool
    .query(query, [req.body.memo, req.body.poster, req.body.post, id])
    .then((response) => {
      res.json(req.body);
    });
});

posts.get("/posts/:id", (req, res) => {
  let query = `SELECT * FROM posts JOIN diyshows ON posts.show_id = diyshows.id WHERE posts.show_id=${req.params.id}`;
  pool.query(query).then((response) => {
    res.json(response.rows);
  });
});

module.exports = posts;
