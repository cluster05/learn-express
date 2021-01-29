const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000

app.use('/public', express.static(path.join(__dirname + '/public')))

app.get('/', (req, res) => {
    res.send('METHOD : GET')
})
app.post('/', (req, res) => {
    res.send('METHOD :POST ')
})
app.put('/', (req, res) => {
    res.send('METHOD : PUT')
})
app.delete('/', (req, res) => {
    res.send('METHOD : DELETE')
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})