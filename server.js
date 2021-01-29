const express = require('express');
const app = express();
const PORT = 3000

// Middleware functions can perform the following tasks:
// Execute any code.
// Make changes to the request and the response objects.
// End the request-response cycle.
// Call the next middleware in the stack.

var myLogger = function (req, res, next) {
    console.log('LOGGED')
    next()
}

app.use(myLogger)

app.get('/', function (req, res) {
    res.send('Hello World!')
})


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})