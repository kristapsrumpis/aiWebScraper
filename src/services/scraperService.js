const axios = require("axios");
const cheerio = require("cheerio");

async function scrapePage(uri) {
  try {
    const response = await axios.get(uri);
    const html = response.data;
    const $ = cheerio.load(html);
    return {
      success: true,
      uri,
      html,
      $,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
}

module.exports = { scrapePage };
