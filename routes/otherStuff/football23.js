const express = require('express');
const footballRouter = express.Router();
const playersStream = require('../../resources_football/players_stream.json');

footballRouter.get('/stream', async(req, res) => {
    console.log(req.query);
    res.send(playersStream.slice(parseInt(req.query.offset), parseInt(req.query.offset) + parseInt(req.query.limit)));
});

footballRouter.post('/stream', async(req, res) => {
    console.log(req.body);
    res.send('post requset received');
});

// console.log(playersStream.slice(10, 15));

module.exports = footballRouter;