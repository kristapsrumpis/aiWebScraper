const express = require("express");
const { INDEX_ROUTE, AI_REQUEST_POST_ROUTE } = require("./../config");
const index_route = require("../controlers/index");
const ai_request = require("./../controlers/ai_request");

// create main router
const main = express.Router();

// index route path
main.get(INDEX_ROUTE, index_route);

// AI request route sends request to AI
main.post(AI_REQUEST_POST_ROUTE, ai_request);

module.exports = main;
