const model = require('./model')

module.exports.fetchArticles = async (event) => {
  const { type } = event.queryStringParameters
  const params = JSON.parse(event.body)
  let data
  switch (type) {
    case 'headlines':
      data = await model.headlines(params)
      console.log('found: ', data.totalResults)
      return data.articles
    case 'search':
      data = await model.everything(params)
      console.log('found: ', data.totalResults)
      return data.articles
    default:
      console.log('none')
      break
  }
}
