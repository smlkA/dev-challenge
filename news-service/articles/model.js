require('dotenv').config()
const NewsAPI = require('newsapi')

const newsapi = new NewsAPI(process.env.NEWS_API_KEY).v2

module.exports.headlines = async (params) => newsapi.topHeadlines(params)
module.exports.everything = async (params) => newsapi.everything(params)
