var express = require('express');
var bufferRouter = express.Router();

let bufferCount = 0;

bufferRouter.get('/error500', (req, res) => {
    res.status(500).send({
        info23: 'kavalane 500 pamputunna -- ErrorIntereptorService in testing',
        time23: new Date().toISOString()
    });
});

bufferRouter.get('/', (req, res) => {
    console.log("buffer get call ", ++bufferCount);
    res.send('Welcome to buffers');
});

module.exports = bufferRouter;