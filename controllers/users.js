const db = require('../config/db')

db.query('SELECT * FROM users', (err, result) => {
    console.log(err);
    console.log(result);
})