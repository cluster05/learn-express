const express = require('express');
const app = express();
const PORT = 3000

/* An Express application can use the following types of middleware:
    Application-level middleware
    Router-level middleware
    Built-in middleware
    Error-handling middleware
    Third-party middleware
    */


/* Application-level middleware
Bind application-level middleware to an instance of the app object by using the app.use()
and app.METHOD() functions, where METHOD is the HTTP method of the request that the 
middleware function handles (such as GET, PUT, or POST) in lowercase.
*/

//   Router-level middleware
// var router = express.Router()


//   Error-handling middleware
// Define error-handling middleware functions in the same way as other middleware functions, except with four arguments instead of three, specifically with the signature (err, req, res, next)):

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

//   Third-party middleware
var cookieParser = require('cookie-parser')
// load the cookie-parsing middleware
app.use(cookieParser())


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})