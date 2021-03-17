/* Добрый день. 
Несколько комментариев к этой работе. 
Из за ограниченного времени и высокой загрузки на текущей работе, реализован только базовый функционал. 
Планы по доработке:
- Добавить централизованный обработчик ошибок, доработать обработку ошибок для каждого роута.
- Добавить валидацию celebrate на роуты.
- Вынести все конфигурации в отдельные файлы.
- Реализовать потоковую отдачу файлов.

Logout реализован через смену кодовой фразы, это отвечает тестовому заданию, но не подходит для реального использования. 
Вариант для разработки: сохранение в базу refresh токена для каждого пользователя, проверка его наличия и акруальности
при каждом обращении к защищенным роутам. При разлогине удалять refresh токен из базы.

Буду благодарен за обратную связь.
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

const { PORT = 3000 } = process.env;



app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});