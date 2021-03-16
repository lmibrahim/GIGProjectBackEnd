"use strict";

// require the Express module
const express = require("express");
// Creates an new router object
const shows = express.Router();

const pool = require("./connection");

shows.get("/diyshows", (req, res) => {
  let query = `SELECT * FROM diyshows`;
  pool.query(query).then((response) => {
    res.json(response.rows);
  });
});

shows.get("/diyshows/:id", (req, res) => {
  let id = req.params.id;
  let query = `SELECT * FROM diyshows WHERE diyshows.id = ${id}`;
  pool.query(query).then((response) => {
    res.json(response.rows);
  });
});

shows.post("/diyshows", (req, res) => {
  let query =
    "INSERT INTO diyshows (title, start, description, address, diy) VALUES ($1::varchar, $2::timestamp, $3::text, $4::text, $5::boolean)";
  pool
    .query(query, [
      req.body.title,
      req.body.start,
      req.body.description,
      req.body.address,
      true,
    ])
    .then((response) => {
      res.json(req.body);
    });
});

// export routes for use in server.js
module.exports = shows;
