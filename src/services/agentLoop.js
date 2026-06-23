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

    // debuging ai promt
    console.log(prompt);

    const ai = await callAI(prompt);

    // debuging ai response
    console.log("AI Response: ", ai.response);

    let parsed;
    try {
      // cleans ai respons make sure returned clan JSON file
      const cleaned = cleanAIResponse(ai.response);
      parsed = JSON.parse(cleaned);

      // Auto Wrap Raw Data (special cases for ai to self inprove on next step)
      if (!parsed.action || !parsed.data) {
        parsed = {
          action: "return_data",
          data: { error: "Error in response", row: parsed },
        };
      }
    } catch (err) {
      return { error: "AI returned invalid JSON", row: ai.response };
    }

    const { action, data } = parsed;
    switch (action) {
      // 1. Scraps link wich is requested
      case "scrape_page":
        lastResult = await scrapePage(data.url);
        break;

      // 2.  Analize content (AI only step)
      case "analyze_content":
        lastResult = data.analysis || { status: "analysis complete" };
        break;

      //  3. Fallow Link (Ai decides next URL)
      case "fallow_link":
        lastResult = await scrapePage(data.url);
        break;

      // 4. Return data fallback wraper
      case "return_data":
        lastResult = data;
        break;

      // 8. finish scraping process
      case "finish":
        continueLoop = false;
        lastResult = data;
        break;

      // Unknown Action
      default:
        return { error: "Unknown action", action };
    }

    // auto save in memory for next loop
    updateMemory("last_result", lastResult);

    // loads memory for next step
    memory = loadMemory();
  }
  return lastResult;
}

module.exports = { runAgent };
