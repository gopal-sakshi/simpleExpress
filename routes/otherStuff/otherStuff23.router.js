const express = require('express');
const otherRouter = express.Router();

const axios54 = require('axios');


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