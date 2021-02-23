const AWS = require('aws-sdk')

const {
  CONFIG_BOOKMARKS_TABLE,
  CONFIG_DYNAMODB_ENDPOINT,
  IS_OFFLINE,
} = process.env

let dynamoDb

if (IS_OFFLINE === 'true') {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: CONFIG_DYNAMODB_ENDPOINT,
  })
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient()
}

module.exports.addBookmark = async (article) => {
  const dbParams = {
    TableName: CONFIG_BOOKMARKS_TABLE,
    Item: {
      bookmarkId: String(new Date().getTime()),
      ...article,
    },
  }

  await dynamoDb.put(dbParams).promise()
}

module.exports.getBookmarks = async () => {
  const dbParams = {
    TableName: CONFIG_BOOKMARKS_TABLE,
  }

  const articles = await dynamoDb.scan(dbParams).promise()
  return articles
}
