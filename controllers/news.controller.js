const { getNewsExternal } = require("../services/news.service");

async function getUserNews(req, res) {
  try {
    const { message, status, news } = await getNewsExternal(req.email);
    res.status(status).json({
      message,
      news
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUserNews,
};