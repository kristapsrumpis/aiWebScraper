const { runAgent } = require("../services/agentLoop");

async function ai_request(req, res) {
  const result = await runAgent(req.body);

  res.json({
    status: 200,
    success: true,
    response: result,
  });
}

module.exports = ai_request;
