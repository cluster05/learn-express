const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000


// routing methods 
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

// special route
app.all('/all', (req, res) => {
    res.send('all route response')
})

//The characters ?, +, *, and () are subsets of their regular expression counterparts.
// The hyphen (-) and the dot (.) are interpreted literally by string-based paths.
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})