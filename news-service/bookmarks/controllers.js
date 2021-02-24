const model = require('./model')

module.exports.getBookmarks = async () => {
  const articles = await model.getBookmarks()
  return articles
}

module.exports.addBookmark = async (event) => {
  const article = JSON.parse(event.body)

  await model.addBookmark(article)
}
