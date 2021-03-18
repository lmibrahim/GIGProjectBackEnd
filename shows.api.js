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
  let showId = req.params.id;
  let query = `SELECT * FROM diyshows WHERE diyshows.id = ${showId}`;
  pool.query(query).then((response) => {
    res.json(response.rows);
  });
});

shows.post("/diyshows", (req, res) => {
  let query =
    "INSERT INTO diyshows (title, start, description, address, diy, lat, lng, display) VALUES ($1::varchar, $2::timestamp, $3::text, $4::text, $5::boolean, $6::real, $7::real, $8::boolean)";
  pool
    .query(query, [
      req.body.title,
      req.body.start,
      req.body.description,
      req.body.address,
      true,
      req.body.lat,
      req.body.lng,
      false
    ])
    .then((response) => {
      res.json(req.body);
    });
});

shows.put("/diyshows/:id", (req, res)=> {
  console.log('got here');
  let showId = req.params.id;
  let query =
  `UPDATE diyshows SET display=true WHERE diyshows.id = ${showId}`;
  pool.query(query)
  .then((response)=> {
    res.json(req.body)
  })
}
);

// export routes for use in server.js
module.exports = shows;
