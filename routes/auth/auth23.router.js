var express = require('express');
var authRouter = express.Router();


authRouter.put('/signin', (req, res) => {
    console.log('inside signInnn');    
    console.log(req.body);
    res.setHeader('content-type', 'text/plain');
    res.send('signin sent');
});

authRouter.put('/signup', (req, res) => {
    console.log('inside signup');
    console.log(req.body);
    res.send('signup sent');
})
module.exports = authRouter 