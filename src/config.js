// Sets port on wich running express app
const PORT = 8080;

// Uri where aoi running default ( http://localhost: )
const APP_URI = "http://localhost:";

// Ai web Scraper app title
const TITLE = "Ai Web Scraper";

// Add route namings
// Index route
const INDEX_ROUTE = "/";

// AI request post route path
const AI_REQUEST_POST_ROUTE = "/ai-request";

// AI request URI default for local run docker container uri: "http://localhost:"
const AI_REQUEST_URI = "http://localhost:";

// AI request port for local run docker container port: 11434
const AI_REQUEST_PORT = 11434;

// AI model name
const AI_MODEL_NAME = "gemma:2b-instruct-q4_K_M";

// Ai memory stored in ./../memory/memory.json
const AI_MEMORY_DIR = "./memory";

// AI memory file name
const AI_MEMORY_FILE = "memory.json";

// AI agent instructions
const AI_AGENT_INSTRUCTIONS = require("./memory/agentInstructions.json");

module.exports = {
  PORT,
  APP_URI,
  TITLE,
  AI_REQUEST_POST_ROUTE,
  INDEX_ROUTE,
  AI_REQUEST_URI,
  AI_REQUEST_PORT,
  AI_MODEL_NAME,
  AI_MEMORY_DIR,
  AI_MEMORY_FILE,
  AI_AGENT_INSTRUCTIONS,
};
