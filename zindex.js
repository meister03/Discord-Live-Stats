const config = require("./config.json")
const Server = require('./server.js')

const express = require("express");
const app = express();

const client = new Server(app, config)

client.on('error', console.log)

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});