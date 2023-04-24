"use strict";
const { app } = require("./app");
const http = require("http");
require("dotenv").config();
const server = http.createServer(app);
const db = require("./config");
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

const io = new Server(server, {
  reconnect: true,
  transports: [ "websocket" ],
  cors: {
    origin: `http://139-144-162-115.ip.linodeusercontent.com/`,
    methods:["GET","POST"]
  },
});
console.log("io",io)
io.on('connection', (socket) => {
  socket.on('newBid', bid => {
  console.log('New bid received:', bid);
  io.emit("send bid", bid);
  });
});
server.listen(
  process.env.BID_PORT,
  console.log(`server is running at port http://${process.env.BID_SERVER}`)
);
