const Sequelize = require('sequelize');

const LOGGING = false;
const DBNAME = 'CHANGE_ME';
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${DBNAME}`,
  {
    logging: LOGGING,
  }
);

module.exports = db;
