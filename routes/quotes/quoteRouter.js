var express = require('express');
const path = require('path');
var router = express.Router();

router.get('/', (req, res) => {    
    res.sendFile('index.html', {root: path.join(__dirname, '../../resources')});
    // we told Express to serve an index.html file 
});

// for some reason, it isnt working... look into it later...
router.post('/addQuote', (req, res) => {
    console.log('Hellooooooooooooooooo!');
    console.log(req.body);
    res.status(200).send('your quote received');
});
  
module.exports = router;