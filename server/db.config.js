const { Pool } = require("pg");
require("dotenv").config();
const connectionString = process.env.DATABASE_URL || null;
let pool;
if (connectionString) {
  pool = new Pool({ connectionString });
} else {
  pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

module.exports = pool;
