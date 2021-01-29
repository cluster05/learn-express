const express = require('express');
const app = express();
const PORT = 3000

//single middle were
app.get('/user/:userID', (req, res, next) => {

    const userID = parseInt(req.params.userID);

    userID === 10 ? next() : res.send('unAuthorised');

}, (req, res) => {
    res.send('Authorised');
})

//multiple moddlewere
var cb0 = function (req, res, next) {
    console.log('CB0')
    next()
}

var cb1 = function (req, res, next) {
    console.log('CB1')
    next()
}

var cb2 = function (req, res) {
    res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})