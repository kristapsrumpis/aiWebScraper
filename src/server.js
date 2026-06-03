const express = require("express");
const path = require("path");
const main = require("./routes");  // import main routes


const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(express.static(path.join(process.cwd(), "public")));
app.use("/bootstrap", express.static(path.join(process.cwd(), "node_modules/bootstrap/dist")));


// register routes
app.use("/", main)

module.exports = {app};