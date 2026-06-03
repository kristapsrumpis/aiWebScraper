const express = require("express");
const { TITLE, APP_URI, PORT, AI_REQUEST_POST_ROUTE } = require("./config");

// create main router
const main = express.Router();

// index route path
main.get("/", (req, res) => {
  res.render("index.ejs", {
    title: TITLE,
    APP_URI,
    PORT,
    AI_REQUEST_POST_ROUTE,
  });
});

// AI request route sends request to AI
main.post(AI_REQUEST_POST_ROUTE, (req, res) => {
  const data = req.body;
  console.log("recived:", data);

  res.json({
    status: 200,
    recived: data,
  });
});

module.exports = main;
