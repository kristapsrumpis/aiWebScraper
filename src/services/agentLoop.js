const { callAI } = require("./aiService");
const { scrapePage } = require("./scraperService");
const { loadMemory, updateMemory } = require("./memoryService");
const { response } = require("express");

async function runAgent(userInput) {
  let memory = loadMemory();
  let continueLoop = true;
  let lastResult = null;

  while (continueLoop) {
    const prompt = `
    SYSTEM INSTRUCTIONS:
    ${JSON.stringify(require("../memory/agent_instructions.json"), null, 2)}

    MEMORY:
    ${JSON.stringify(memory, null, 2)}

    LAST RESULT:
    ${JSON.stringify(lastResult, null, 2)}

    USER INPUT:
    ${JSON.stringify(userInput, null, 2)}

    Respond ONLY in JSON.
    `;

    const ai = await callAI(prompt);

    let parsed;
    try {
      parsed = JSON.parse(ai.response);
    } catch (err) {
      return { error: "AI returned invalid JSON", row: ai.response };
    }

    const { action, data } = parsed;
    switch (action) {
      case "scrape_page":
        lastResult = await scrapePage(data.url);
        break;

      case "update_memory":
        updateMemory(data.key, data.value);
        memory = loadMemory();
        lastResult = { status: "memory updated" };
        break;

      case "finish":
        continueLoop = false;
        lastResult = data;
        break;

      default:
        return { error: "Unknown action", action };
    }
  }
  return lastResult;
}

module.exports = { runAgent };
