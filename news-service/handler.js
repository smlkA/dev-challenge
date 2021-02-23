const articles = require('./articles/controllers')
const bookmarks = require('./bookmarks/controllers')

/**
 * This is a basic hello function.
 *
 * @param {Object} event - HTTP event
 * @return {JSON} HTTP response JSON obj
 *
 */
module.exports.hello = async (event, ctx, cb) => {
  cb(null, {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  })
}

/**
 * This function fetches articles based on query passed to it
 *
 * @param {Object} event - HTTP event
 * @return {JSON} HTTP response JSON obj
 *
 */
module.exports.fetchArticles = (event, ctx, cb) => {
  articles
    .fetchArticles(event)
    .then((data) => {
      cb(null, {
        statusCode: 200,
        body: JSON.stringify(
          {
            data,
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

module.exports.getBookmarks = (event, ctx, cb) => {
  bookmarks
    .getBookmarks()
    .then((data) => {
      cb(null, {
        statusCode: 200,
        body: JSON.stringify(
          {
            data,
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
  bookmarks
    .addBookmark(event)
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
