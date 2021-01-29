const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const FAKE_DB = [
    { username: 'user1', email: 'user1@mail.com', password: 'password' },
    { username: 'user2', email: 'user2@mail.com', password: 'password' },
    { username: 'user3', email: 'user3@mail.com', password: 'password' }
];

app.post('/auth/register', (req, res) => {
    const { username, email, password } = req.body;
    FAKE_DB.push({ username, email, password });
    res.send(FAKE_DB)
});

app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    FAKE_DB.forEach(user => {
        if (user.email === email) {
            if (user.password === password) {
                res.send({ access_token: '123456789876543212345678-876543210' })
            } else {
                res.send({ message: 'Invalid Password' })
            }
        } else {
            res.send({ message: 'Invalid Credentails' })
        }
    });
});

app.post('/auth/reset-password', (req, res) => {
    const { email, password, newPassword } = req.body;
    FAKE_DB.forEach(user => {
        if (user.email === email) {
            if (user.password === password) {
                user.password = newPassword;
                res.send(user);
            } else {
                res.send({ message: 'Invalid Password' })
            }
        } else {
            res.send({ message: 'Invalid Credentails' })
        }
    });
})


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})