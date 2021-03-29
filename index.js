/* 
Планы по доработке:
- Добавить централизованный обработчик ошибок, доработать обработку ошибок для каждого роута.
- Добавить валидацию celebrate на роуты.
- Вынести все конфигурации в отдельные файлы.

Logout реализован через смену кодовой фразы, это отвечает тестовому заданию, но не подходит для реального использования. 
Вариант для разработки: сохранение в базу refresh токена для каждого пользователя, проверка его наличия и актуальности
при каждом обращении к защищенным роутам. При разлогине удалять refresh токен из базы.

 */

const express = require('express');
const app = express();
const cors = require('cors');
const auth = require('./middlewares/auth');

const routes = require('./routes/index');
const { createUser, login, refreshTokens, logout } = require('./controllers/users')

app.use(cors());
app.use(express.json({ extended: true }));
app.post('/signup', createUser);
app.get('/signin', login);
app.get('/signin/new_token', refreshTokens);
app.get('/logout', auth, logout);

app.use(routes);
app.use((req, res) => {
  res.status('404');
  res.send({ message: 'Запрашиваемый ресурс не найден' });
});

const { PORT = 3000 } = process.env;



app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
