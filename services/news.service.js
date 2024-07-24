const fs = require("fs").promises;
const axios = require("axios");

async function getNewsExternal(email) {
    const data = await fs.readFile("static.json", "utf-8");
    const response = JSON.parse(data);
    const user = response.users.find(user => user.email === email);
    if(!user) {
        return {
            message: "User not found",
            status: 404,
        }
    }
    else {
        const preferences = user.preferences;
        const apiKey = process.env.NEWS_API_KEY;
        const query = preferences.join('+');
        console.log(query, "QUERY:");
        const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
        console.log(url, "URL:");
        const news = await axios.get(url);
        if(news.data.status === "error") {
            return {
                message: news.data.message,
                status: 400,
            }
        }
        else {
            return {
                message: "News fetched successfully",
                status: 200,
                news: news.data.articles,
            }
        }

    }

}

module.exports = {
  getNewsExternal,
};