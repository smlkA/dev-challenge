const model = require('./model')

const getBookmarks = async () => {
  const articles = await model.getBookmarks()
  return articles
}

const addBookmark = async (event) => {
  const article = JSON.parse(event.body)

  await model.addBookmark(article)
}

module.exports.getBookmarks = (event, ctx, cb) => {
  getBookmarks()
    .then((articles) => {
      cb(null, {
        statusCode: 200,
        body: JSON.stringify(
          {
            articles,
          },
          null,
          2
        ),
      })
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error)
      cb(error)
      // TODO add error handler
    })
}

module.exports.addBookmark = (event, ctx, cb) => {
  // eslint-disable-next-line no-console
  addBookmark(event)
    .then(() => {
      cb(null, {
        statusCode: 201,
        body: null,
      })
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error)
      cb(error)
      // TODO add error handler
    })
}
