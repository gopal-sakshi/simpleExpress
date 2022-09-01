const express = require('express');
const otherRouter = express.Router();

const axios54 = require('axios');

otherRouter.get('/port', (req,res) => {
    console.log(`you've port`);
    console.log('local Port = ', req.socket.localPort);
    console.log('remote Port = ', req.socket.remotePort);
    console.log('port from req headers ',req.headers.host);    
    // res.write(`you've hit ${req.socket.localPort}`);            // Cannot set headers after they are sent to the client
    res.send(`response is ${req.socket.localPort}`);
})

otherRouter.put('/cors', (req, res) => {
    console.log(req.body);
    let url19 = 'https://api.postalpincode.in/pincode/'+req.body.pincode
    axios54({
        method:'get',
        url: url19
    }).then(response => {
        res.send(JSON.stringify(response.data));
    }).catch(error => {
        console.log(error);
        res.send('phattu, enduko mari');
    });    
});

module.exports = otherRouter;