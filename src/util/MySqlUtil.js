const mysql = require('mysql2/promise');

// https://stackoverflow.com/questions/56592352/node-js-module-export-async-function
exports.getAllDatabses = async ({ host, user, password, withInternal = false }) => {
    const connection = await mysql.createConnection({ host, user, password });

    let [rows, fields] = await connection.query('SHOW DATABASES;');
    if (!withInternal) {
        rows = rows
            .map(({ Database }) => Database)
            .filter(db => !['information_schema'].includes(db.toLowerCase()));
    }
    return rows;
}