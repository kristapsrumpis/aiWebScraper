// const {} = require("./../config");
const { scrapePage } = require("./../services/scraperService");
const { callAI } = require("./../services/aiService");
const { AI_AGENT_INSTRUCTIONS } = require("./../config");
const {
  loadMemory,
  updateMemory,
  saveMemory,
} = require("./../services/memoryService");

async function ai_request(req, res) {
  const data = req.body;
  let page;
  let aiResponse;

  try {
    page = await scrapePage(data.userInputURI);
    aiResponse = await callAI(data.userInputPrompt);
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
