const axios = require("axios");
const cheerio = require("cheerio");

async function scrapePage(url) {
  try {
    const response = await axios.get(url);
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

module.exports = scrapePage;
