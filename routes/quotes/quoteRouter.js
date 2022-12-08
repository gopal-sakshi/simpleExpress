var express = require('express');
const path = require('path');
var router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../../resources')});
    // we told Express to serve an index.html file 
});

router.get('/getIp', (req, res) => {
    var responseObject = {
        remoteAddr: req.socket.remoteAddress,
        ip: req.ip
    }    
    console.log(req.socket.remoteAddress);          // ::1 ====> same as '127.0.0.1', which is the IPv4 version of the loopback address; ::1 is IPv6
    res.status(200).json(responseObject);
})
// for some reason, it isnt working... look into it later...
router.post('/addQuote', (req, res) => {
    console.log('Hellooooooooooooooooo!');
    console.log(req.body);
    res.status(200).send('your quote received');
});
  
module.exports = router;