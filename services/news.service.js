const fs = require("fs").promises;
const axios = require("axios");
const { getCache, setCache } = require("../utils/cache");
const { favoriteNews } = require("../controllers/news.controller");

const fetchNewsFromAPI = async (preferences) => {
  const apiKey = process.env.NEWS_API_KEY;
  const query = preferences.join("+");
  console.log(query, "QUERY:");
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
  console.log(url, "URL:");
  const response = await axios.get(url);
  //console.log(response.data.articles, "RESPONSE:");
  return response.data.articles;
};

async function getNewsExternal(email) {
  const data = await fs.readFile("./resources/static.json", "utf-8");
  const response = JSON.parse(data);
  const user = response.users.find((user) => user.email === email);
  if (!user) {
    return {
      message: "User not found",
      status: 404,
    };
  } else {
    const cacheKey = `news_${user.email}_${user.preferences.join("_")}`;
    console.log(cacheKey, "CACHE KEY:");

    const preferences = user.preferences;

    let newsArticles = await getCache(cacheKey);
    if (!newsArticles) {
      let newsArticles = await fetchNewsFromAPI(preferences);
      //console.log(newsArticles, "NEWS ARTICLES:");
      await setCache(cacheKey, newsArticles);
      return {
        message: "News fetched successfully",
        status: 200,
        news: newsArticles,
      };
    }

    return {
      message: "News fetched successfully",
      status: 200,
      news: newsArticles,
    };
  }
}

async function readNewsExternal(email, id) {
  const data = await fs.readFile("./resources/static.json", "utf-8");
  const response = JSON.parse(data);
  const user = response.users.find((user) => user.email === email);
  if (!user) {
    return {
      message: "User not found",
      status: 404,
    };
  } else {
    const preferences = user.preferences;

    let newsArticles = await fetchNewsFromAPI(preferences);

    const readArticle = newsArticles.find(
      (article) => article.source.name === id
    );
    console.log(readArticle.source.name, "READ ARTICLE:");

    const data = await fs.readFile("./resources/read.json", "utf-8");
    const response = JSON.parse(data);
    response.articles.push(readArticle);
    await fs.writeFile("./resources/read.json", JSON.stringify(response));

    return {
      message: "Article marked as READ successfully",
      status: 200,
      readArticle: readArticle.source.name,
    };
  }
}


async function favoriteNewsExternal(email, id) {
  const data = await fs.readFile("./resources/static.json", "utf-8");
  const response = JSON.parse(data);
  const user = response.users.find((user) => user.email === email);
  if (!user) {
    return {
      message: "User not found",
      status: 404,
    };
  } else {
    const preferences = user.preferences;

    let newsArticles = await fetchNewsFromAPI(preferences);

    const favoriteArticle = newsArticles.find(
      (article) => article.source.name === id
    );
    console.log(favoriteArticle.source.name, "Favorite ARTICLE:");

    const data = await fs.readFile("./resources/favorite.json", "utf-8");
    const response = JSON.parse(data);
    response.articles.push(favoriteArticle);
    await fs.writeFile("./resources/favorite.json", JSON.stringify(response));

    return {
      message: "Article marked as FAVORITE successfully",
      status: 200,
      favoriteArticle: favoriteArticle.source.name,
    };
  }
}

module.exports = {
  getNewsExternal,
  readNewsExternal, favoriteNewsExternal
};
