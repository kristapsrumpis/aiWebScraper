const express = require("express");
const main = express.Router();


// index route path
main.get("/", (req, res) => {
    res.render("index.ejs" );
})



module.exports = main;