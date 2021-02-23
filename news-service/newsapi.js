/* eslint-disable no-console */
require('dotenv').config()
const NewsAPI = require('newsapi')

const newsapi = new NewsAPI(process.env.NEWS_API_KEY).v2

module.exports.headlines = async (params) => newsapi.topHeadlines(params)
module.exports.everything = async (params) => newsapi.everything(params)

module.exports.fetchArticles = async (type, params) => {
  let data
  switch (type) {
    case 'headlines':
      data = await exports.headlines(params)
      console.log('found: ', data.totalResults)
      return data.articles
    case 'search':
      data = await exports.everything(params)
      console.log('found: ', data.totalResults)
      return data.articles
    default:
      console.log('none')
      break
  }
}
