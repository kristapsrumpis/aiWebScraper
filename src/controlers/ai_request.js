// const {} = require("./../config");
const { scrapePage } = require("./../services/scraperService");
const { callAI } = require("./../services/aiService");
const {
  AI_AGENT_INSTRUCTIONS,
  AI_MEMORY_FILE,
  AI_MEMORY_DIR,
} = require("./../config");
const {
  loadMemory,
  updateMemory,
  saveMemory,
} = require("./../services/memoryService");
const path = require("path");

async function ai_request(req, res) {
  const userInput = req.body;
  let aiResponse;
  const memory = path.join(AI_MEMORY_DIR, AI_MEMORY_FILE);
  const prompt = `
    SYSTEM INS|TRUCTIONS:
    ${JSON.stringify(AI_AGENT_INSTRUCTIONS, null, 2)}

    MEMORY:
    ${JSON.stringify(memory, null, 2)}

    USER REQUEST:
    ${JSON.stringify(userInput)}
    `;

  try {
    aiResponse = await callAI(prompt);
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
  res.json({
    status: 200,
    success: true,
    response: aiResponse,
  });
}

module.exports = ai_request;
