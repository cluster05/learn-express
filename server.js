const express = require('express');
const app = express();
const birdRouter = require('./bird');
const PORT = 3000

app.use('/public', express.static('/public'))

app.use('/bird', birdRouter);


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})