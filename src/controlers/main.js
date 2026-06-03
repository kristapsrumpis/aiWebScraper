const { TITLE, APP_URI, PORT, AI_REQUEST_POST_ROUTE } = require("./../config");

function index_route(req, res) {
  res.render("index.ejs", {
    title: TITLE,
    APP_URI,
    PORT,
    AI_REQUEST_POST_ROUTE,
  });
}

module.exports = index_route;
