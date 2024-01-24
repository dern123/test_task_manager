const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: process.env.DATABASE,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
})
module.exports = pool;