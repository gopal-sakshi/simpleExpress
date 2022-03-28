var express = require('express');
var bufferRouter = express.Router();

bufferRouter.get('/', (req, res) => {
    res.send('Welcome to buffers');
});

module.exports = bufferRouter;