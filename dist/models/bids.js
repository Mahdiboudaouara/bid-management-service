"use strict";

const {
  faker
} = require("@faker-js/faker");
const mysql = require("mysql");
const data = [];
const array = [];
const rows = [["1", "1", 0.1, "2023-02-03T10:00:00"], ["2", "1", 0.1, "2023-02-04T00:00:00"], ["3", "1", 0.1, "2023-02-03T13:00:00"], ["4", "1", 0.1, "2023-02-03T23:00:00"], ["5", "1", 0.1, "2023-02-03T07:00:00"], ["6", "1", 0.1, "2023-02-04T02:00:00"], ["7", "1", 0.1, "2023-02-04T2:00:00"], ["8", "1", 0.1, "2023-02-04T05:55:00"], ["9", "1", 0.1, "2023-02-04T03:12:00"], ["10", "1", 0.1, "2023-02-3T22:00:00"], ["11", "1", 0.1, "2023-02-03T19:00:00"], ["12", "1", 0.1, "2023-02-03T17:08:00"], ["13", "1", 0.1, "2023-02-03T15:20:00"]];
const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  const sql = "INSERT INTO bids (product_id,user_id,bidAmount,date) VALUES ?";
  db.query(sql, [rows], function (err, result) {
    if (err) throw err;
    console.log("products inserted");
  });
});