const fs = require("fs");
const path = require("path");
const { AI_MEMORY_DIR, AI_MEMORY_FILE } = require("./../config");

// create path where will be stored Ai memory
const memoryDir = path.join(__dirname, "..", AI_MEMORY_DIR);
// Ai stored memory file name
const memoryFile = path.join(memoryDir, AI_MEMORY_FILE);

// ensure Dir exist
if (!fs.existsSync(memoryDir)) {
  fs.mkdirSync(memoryDir);
}

// function to loadMemory
function loadMemory() {
  if (!fs.existsSync(memoryFile)) return {};
  return JSON.parse(fs.readFileSync(memoryFile, "utf8"));
}

// function saves memory
function saveMemory(data) {
  fs.writeFileSync(memoryFile, JSON.stringify(data, null, 2));
}

// function update memory
function updateMemory(key, value) {
  const mem = loadMemory();
  mem[key] = value;
  saveMemory(mem);
}

module.exports = { loadMemory, saveMemory, updateMemory };
