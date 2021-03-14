const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const { createAccessToken, createRefreshToken } = require('../utils/tokens')

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
  // проверка наличия пользователя в базе
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

        const accessToken = createAccessToken(name);
        const refreshToken = createRefreshToken(name);

        res.status(200).send({
          accessToken: `Bearer ${accessToken}`,
          refreshToken: refreshToken,
          message: 'Вход выполнен успешно'
        });
      }
    }
  })
}

module.exports.refreshTokens = (req, res) => {
  const { refToken } = req.body;
  let payload;
  try {
    payload = jwt.verify(refToken, 'secret-key');
    if (payload.type !== 'refresh') {
      res.status(401).send({
        message: 'Invalid token',
      });
      return;
    }
  } catch (err) {
    return res
      .status(401)
      .send({ message: err.message });
  }
  const accessToken = createAccessToken(payload.userId);
  const refreshToken = createRefreshToken(payload.userId);
  res.status(200).send({
    accessToken: `Bearer ${accessToken}`,
    refreshToken: refreshToken,
  });

}