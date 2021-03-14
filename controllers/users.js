const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.getAllUsers = (req, res) => {
    db.query('SELECT id FROM users', (err, result) => {
        if (err) {
            return console.log(err);
        } else {
            res.send(result);
        }
    });
}

module.exports.createUser = (req, res) => {

    const { name, password } = req.body;

    db.query("SELECT `id`, `password` FROM `users` WHERE id = '" + name + "'", (err, result) => {
        if (err) {
            res.status(400).send({ message: err });
        }
        else if (result.length > 0) {
            res.status(409).send({ message: 'Пользователь с таким id уже существует' });
            console.log(result)
        } else {
            const salt = bcrypt.genSaltSync(15);
            const hash = bcrypt.hashSync(password, salt);
            db.query("INSERT INTO `users`(`id`, `password`) VALUES ('" + name + "','" + hash + "')", (err, result) => {
                if (err) {
                    res.status(400).send({ message: err });
                } else {
                    res.status(201).send({
                        message: 'Регистрация прошла успешно'
                    });
                }
            })
        }
    });
}

module.exports.login = (req, res) => {

    const { name, password } = req.body;
    db.query("SELECT `id`, `password` FROM `users` WHERE id = '" + name + "'", (err, result) => {
        if (err) {
            res.status(400).send({ message: err });
        } else if (result.length <= 0) {
            res.status(404).send({ message: 'Такого пользователя не существует' });
        }
        else {
            const userpassword = bcrypt.compareSync(password, result[0].password);
            if (!userpassword) {
                res.status(401).send({
                    message: 'неверный логин или пароль',
                });
            }
            else {
                const token = jwt.sign(
                    { id: name },
                    'secret-key',
                    { expiresIn: 600 } 
                );
                res.status(200).send({
                    token: `Bearer ${token}`,
                    message: 'Вход выполнен успешно'
                });
            }

        }
    })
}