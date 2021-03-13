const express = require('express');
const app = express();

app.use(express.json({ extended: true }));

const { PORT = 3000 } = process.env;



app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});