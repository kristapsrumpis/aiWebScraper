const express = require("express");
const {TITLE} = require("./config");

// create main router
const main = express.Router();

// index route path
main.get("/", (req, res) => {
    res.render("index.ejs", {title: TITLE} );
})



module.exports = main;