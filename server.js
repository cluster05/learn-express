const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/auth/register', (req, res) => {
    res.send(req.body)
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})