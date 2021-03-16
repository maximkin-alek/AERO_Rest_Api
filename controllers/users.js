const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const { createAccessToken, createRefreshToken } = require('../utils/tokens');

// получить список пользователей
module.exports.getAllUsers = async (req, res) => {
  await db.query('SELECT id FROM users', (err, result) => {
    if (err) {
      return console.log(err);
    } else {
      res.send(result);
    }
  });
}
// создать пользователя
module.exports.createUser = async (req, res) => {

  const { name, password } = req.body;

  if(!validator.isEmail(name) || !validator.isMobilePhone(name)) {
    return  res.status(400).send({ message: "Имя пользователя не валидно" });
  }

  await db.query("SELECT `id`, `password` FROM `users` WHERE id = '" + name + "'", (err, result) => {
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

          const accessToken = createAccessToken(name);
          const refreshToken = createRefreshToken(name);

          res.status(201).send({
            message: 'Регистрация прошла успешно',
            accessToken: `Bearer ${accessToken}`,
            refreshToken: refreshToken          });
        }
      })
    }
  });
}
// логин
module.exports.login = async (req, res) => {

  const { name, password } = req.body;
  // проверка наличия пользователя в базе
  await db.query("SELECT `id`, `password` FROM `users` WHERE id = '" + name + "'", (err, result) => {
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
// обновление токенов 
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
  req.user = payload;
}
// получить данные пользователя
module.exports.getUser = async (req, res) => {

  await db.query("SELECT `id` FROM `users` WHERE id = '" + req.user.id + "'", (err, result) => {
    if (err) {
      res.status(400).send({ message: err });
    }
    else {
      res.status(200).send(result);
    }
  })
}
