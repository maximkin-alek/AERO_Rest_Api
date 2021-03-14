const express = require('express');
const app = express();
const routes = require('./routes/index');
const { createUser, login } = require('./controllers/users')
const auth = require('./middlewares/auth')

app.use(express.json({ extended: true }));
app.post('/signup', createUser);
app.get('/signin', login);

app.use(auth);
app.use(routes);

const { PORT = 3000 } = process.env;



app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});