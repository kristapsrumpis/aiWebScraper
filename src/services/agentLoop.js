const { callAI } = require("./aiService");
const { scrapePage } = require("./scraperService");
const { loadMemory, updateMemory } = require("./memoryService");
const agentInstructions = require("../memory/agentInstructions.json");

// function cleans  ai JSON respons make sure is clean json
function cleanAIResponse(text) {
  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
}

async function runAgent(userInput) {
  let memory = loadMemory();
  let continueLoop = true;
  let lastResult = null;

  while (continueLoop) {
    const prompt = `
    SYSTEM INSTRUCTIONS:
    ${JSON.stringify(agentInstructions, null, 2)}

    MEMORY:
    ${JSON.stringify(memory, null, 2)}

    LAST RESULT:
    ${JSON.stringify(lastResult, null, 2)}

    USER INPUT:
    ${JSON.stringify(userInput, null, 2)}

    Respond ONLY in JSON.
    `;

    const ai = await callAI(prompt);
    // debuging purpose to fallow ai responses
    console.log("AI RAW RESPONSE: ", ai.response);

    let parsed;
    try {
      // cleans ai respons make sure returned clan JSON file
      const cleaned = cleanAIResponse(ai.response);
      parsed = JSON.parse(cleaned);
    } catch (err) {
      return { error: "AI returned invalid JSON", row: ai.response };
    }

    // Auto Wrap Raw Data (special cases for ai to self inprove on next step)
    if (!parsed.action) {
      parsed = {
        action: "return_data",
        raw: ai.response,
        data: parsed,
      };
    }

    // validate JSON shape to fallow set instructions
    if (!parsed.action || !parsed.data) {
      return {
        error: "AI returned JSON but not in the required {action, data} format",
        row: ai.response,
      };
    }

    const { action, data } = parsed;
    switch (action) {
      // Scraps link wich is requested
      case "scrape_page":
        lastResult = await scrapePage(data.url);
        break;

      // update memory
      case "update_memory":
        updateMemory(data.key, data.value);
        memory = loadMemory();
        lastResult = { status: "memory updated" };
        break;

      case "return_data":
        updateMemory("last_result", data);
        memory = loadMemory();
        lastResult = data;
        break;

      // finish scraping process
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
