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

// export routes for use in server.js
module.exports = shows;
