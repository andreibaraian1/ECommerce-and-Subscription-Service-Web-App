const { Pool } = require("pg");
require("dotenv").config();
const connectionString = process.env.DATABASE_URL || null;
if (connectionString) {
  const pool = new Pool({ connectionString });
} else {
  const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE,
  });
}

module.exports = pool;
