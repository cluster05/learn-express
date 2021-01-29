const express = require('express');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000

const saltRounds = 10;
const JWT_SECRET = "secret";


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const FAKE_DB = [];

app.post('/auth/register', (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            FAKE_DB.push({ username, email, password: hash });
            sendToken(username, email, res);
        });
    });
});

app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    FAKE_DB.forEach(user => {
        if (user.email === email) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    sendToken(user.username, email, res);
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
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        bcrypt.hash(newPassword, salt, function (err, hash) {
                            user.password = hash;
                            sendToken(user.username, email, res);
                        });
                    });
                } else {
                    res.send({ message: 'Invalid Password' })
                }
            });
        } else {
            res.send({ message: 'Invalid Credentails' })
        }
    });
});

const sendToken = (username, email, res) => {
    const paylaod = {
        username,
        email,
    }
    const token = jwt.sign(paylaod, JWT_SECRET, { expiresIn: '10h' });
    res.send({ access_token: token })
}

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.send({ message: 'Unauthorised Request' })
    }
}


app.get('/auth/users/count', verifyToken, (req, res) => {
    res.send({ count: FAKE_DB.length });
});


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})