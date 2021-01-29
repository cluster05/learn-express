const express = require('express');
const app = express();
const PORT = 3000

app.use('/public', express.static('/public'))

app.get('/download', (req, res) => {
    res.download('public/static/hello.txt')
})

app.get('/json/:id', (req, res) => {
    res.json({ id: req.params.id });
    res.redirect('/download')
})
app.get('/render', (req, res) => {
    res.render('public/static/index.html')
})


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})