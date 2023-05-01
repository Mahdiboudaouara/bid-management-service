const express = require("express");
const app = express();
const http = require("http").createServer(app);
const cors = require('cors');
app.use(cors());
const db = require("../config");
const { type } = require("os");
// const { bidValidation } = require("../validation");

// Handle file uploads

async function lastBid(req, res) {
  const product_id = req.params.product_id;

  const getLastBidAmount = `SELECT * FROM bids WHERE product_id=${product_id} ORDER BY bidAmount DESC`;
  db.query(getLastBidAmount, function (err, result) {
    if (err) {
      throw err;
    }
    res.status(200).send(result[0]);
  });
}
async function createBid(req, res) {
  console.log(req.body);
  const product_id = req.body.productId;
  var lastbid=0
  const getLastBidAmount = `SELECT * FROM bids WHERE product_id=${product_id} ORDER BY bidAmount DESC`;
  await db.query(getLastBidAmount, function (err, result) {
    console.log('result =',result[0].bidAmount)
    lastbid=result[0].bidAmount
    console.log("lastbid =",lastbid)
    if (err) {
      throw err;
    }
    console.log(lastbid,req.body.bidAmount)
    if (lastbid<req.body.bidAmount) {
      const insertData =
        "INSERT INTO bids (product_id,user_id,bidAmount,date) VALUES (?,?,?,?)";
       db.query(
        insertData,
        [req.body.productId, req.body.userId, req.body.bidAmount, req.body.date],
        (err, result) => {
          if (err) {
            throw err;
          }
        }
      );
      return res.status(200).send({ message: "Data Inserted Successfully" });
    } else {
      return res.status(401).send({ message: "Bid amount should be higher" });
    }
  });

  // const validator = await bidValidation(req.body);
  // console.log("validator", validator);
  
}


// const socketIO = require("socket.io")(http, {
//   cors: {
//     origin: "http://localhost:3000",

//   },
// });

// socketIO.on('connection', socket => {
//   console.log('a user connected');
//   socket.on('newBid', bid => {
//     console.log('New bid received:', bid);
//   });
// });
module.exports = {
  createBid,
  lastBid,
};