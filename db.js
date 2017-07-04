const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_DOMAIN,
  MONGO_DB_NAME
} = process.env;

const MONGO_URL = `mongodb://${MONGO_USERNAME}:${encodeURIComponent(MONGO_PASSWORD)}@${MONGO_DOMAIN}/${MONGO_DB_NAME}`

exports.url = MONGO_URL;
