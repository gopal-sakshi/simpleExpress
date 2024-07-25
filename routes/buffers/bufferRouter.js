var express = require('express');
var bufferRouter = express.Router();

let bufferCount = 0;

bufferRouter.get('/', (req, res) => {
    console.log("buffer get call ", ++bufferCount);
    res.send('Welcome to buffers');
});

module.exports = bufferRouter;