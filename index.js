const express = require('express');
const app = express();
const routes = require('./routes/index');
const { createUser, login, refreshTokens } = require('./controllers/users')


app.use(express.json({ extended: true }));
app.post('/signup', createUser);
app.get('/signin', login);
app.get('/signin/new_token', refreshTokens);

app.use(routes);

const { PORT = 3000 } = process.env;



app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});