const express = require("express");
const path = require("path");
const main = require("./routes");  // import main routes


const app = express();

// add ejs as view engine
app.set("view engine", "ejs");

// adds views dir where stores ejs layouts
app.set("views", path.join(process.cwd(), "views"));

// add public path for javascript and css
app.use(express.static(path.join(process.cwd(), "public")));

// add bootstrap to project
app.use("/bootstrap", express.static(path.join(process.cwd(), "node_modules/bootstrap/dist")));


// register routes
app.use("/", main)

module.exports = {app};