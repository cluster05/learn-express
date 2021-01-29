const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000

const saltRounds = 10;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const FAKE_DB = [];

app.post('/auth/register', (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            FAKE_DB.push({ username, email, password: hash });
            res.send(FAKE_DB)
        });
    });
});

app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    FAKE_DB.forEach(user => {
        if (user.email === email) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    res.send({ access_token: '1234567890987654321-1234567890' })
                } else {
                    res.send({ message: 'Invalid Password' })
                }
            });
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
});


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})