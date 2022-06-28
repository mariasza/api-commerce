require('dotenv').config({
  path: process.env.NODE_ENV === ".env"
})

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: 'mysql',
  logging: false,
  timezone: '-03:00'
};
