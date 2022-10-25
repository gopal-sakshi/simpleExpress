const express = require('express');
const soap14Router = express.Router();

soap14Router.get('/soap1', (req,res) => {    
    res.send(`response is ${req.socket.localPort}`);
});

module.exports = soap14Router;