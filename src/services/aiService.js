const axios = require("axios");
const {
  AI_REQUEST_URI,
  AI_REQUEST_PORT,
  AI_MODEL_NAME,
} = require("./../config");

async function callAI(prompt) {
  const uri = `${AI_REQUEST_URI}${AI_REQUEST_PORT}/api/generate`;
  try {
    const response = await axios.post(uri, {
      model: AI_MODEL_NAME,
      prompt,
      stream: false,
    });
    return {
      success: true,
      response: response.data.response,
    };
  } catch (err) {
    return {
      success: false,
      response: err.message,
    };
  }
}

module.exports = { callAI };
