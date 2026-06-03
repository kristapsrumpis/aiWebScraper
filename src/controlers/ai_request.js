// const {} = require("./../config");

function ai_request(req, res) {
  const data = req.body;
  console.log("recived:", data);

  res.json({
    status: 200,
    recived: data,
  });
}

module.exports = ai_request;
