const { getNewsExternal } = require("../services/news.service");

async function getUserNews(req, res) {
  try {
    const { message, status, news } = await getNewsExternal(req.email);
    res.status(status).json({
      message,
      news
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
    console.log(error);
  }
}

module.exports = {
  getUserNews,
};