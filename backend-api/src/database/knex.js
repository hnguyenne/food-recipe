const { db_host, db_port, db_user, db_pass, db_name } = process.env;

module.exports = require('knex')({
    client: 'mysql',
    connection: {
        host: db_host,
        port: db_port,
        user: db_user,
        password: db_pass,
        database: db_name,
    },
    pool: {
        min: 0,
        max: 10,
    },
});
