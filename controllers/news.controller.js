const { getNewsExternal, readNewsExternal, favoriteNewsExternal } = require("../services/news.service");

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

async function readNews(req, res) {
  try {
    const { message, status, readArticle } = await readNewsExternal(req.email, req.params.id);
    res.status(status).json({
      message,
      readArticle,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
    console.log(error);
  }
}

async function favoriteNews(req, res) {
  try {
    const { message, status, favoriteArticle } = await favoriteNewsExternal(req.email, req.params.id);
    res.status(status).json({
      message,
      favoriteArticle,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
    console.log(error);
  }
}

module.exports = {
  getUserNews, readNews, favoriteNews
};