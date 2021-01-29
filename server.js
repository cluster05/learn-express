const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000


app.get('/route/:routeParamerter', (req, res) => {
    res.send({ params: req.params })
})

// localhost:3000/flight/IND-USA
app.get('/flight/:from-:to', (req, res) => {
    res.send({ params: req.params })
})

// localhost:3000/plant/genes.speces
app.get('/plant/:genes.:species', (req, res) => {
    res.send({ params: req.params })
})


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})