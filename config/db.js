const mysql = require("mysql");
const dbConfig = require("./db.config");

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

connection.connect(err => {
    if (err) {
        return console.log('Ошибка подключения к базе данных');
    } else {
        console.log("успешно соединено с базой данных");
    }

});

module.exports = connection;