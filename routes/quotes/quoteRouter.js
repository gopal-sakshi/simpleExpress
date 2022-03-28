var express = require('express');
const path = require('path');
var router = express.Router();

router.get('/', (req, res) => {    
    res.sendFile('index.html', {root: path.join(__dirname, '../../resources')});
    // we told Express to serve an index.html file 
});

router.post('/addQuote', (req, res) => {
    console.log('Hellooooooooooooooooo!');
    console.log(req.body);
});
  
module.exports = router;