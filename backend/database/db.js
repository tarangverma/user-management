const fs = require('fs');
const pg = require('pg');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: true,
        ca: process.env.DB_CA_CERT,
    },
};

const pool = new pg.Pool(config);
pool.connect(function (err) {
    if (err)
        console.log(err);
    pool.query("SELECT VERSION()", [], function (err, result) {
        if (err)
            console.log(err);

        console.log(result.rows[0].version);
    });
});

module.exports = pool;
