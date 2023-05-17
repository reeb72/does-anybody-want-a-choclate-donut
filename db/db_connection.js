const mysql = require('mysql2')

/*
const dbConfig = {
    host: "<hostname>",
    port: 3000,
    user: "<username>",
    password: "<password>",
    database: "<schema>",
    connectionTimeout: 10000
}
*/

const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectTimeout: parseInt
}

const connection = mysql.createConnection(dbConfig);

module.exports = connection;