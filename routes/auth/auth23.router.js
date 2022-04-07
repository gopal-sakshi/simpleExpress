var express = require('express');
var authRouter = express.Router();


authRouter.put('/signin', (req, res) => {
    console.log('inside signInnn');    
    console.log(req.body);
    if(req.body.userName == 'g') {
        res.status(400).send('get lost idiot');
    } else {
        res.setHeader('content-type', 'application/json');
        let responseObject = {
            code: 200,
            data: '',
            info: 'signIn success'
        }
        res.send(responseObject);    
    }
    
});

authRouter.put('/signup', (req, res) => {
    console.log('inside signup');
    console.log(req.body);
    res.setHeader('content-type', 'application/json');
    let responseObject = {
        code: 200,
        data: '',
        info: 'signUp success'
    }
    res.send(responseObject);
});
module.exports = authRouter 