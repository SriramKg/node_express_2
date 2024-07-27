const fs = require("fs").promises;
const axios = require("axios");
const { getCache, setCache } = require("../utils/cache");

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

module.exports = {
  getNewsExternal,
};
