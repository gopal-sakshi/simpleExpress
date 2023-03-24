var express = require('express');
const sessions = require('express-session');
var router = express.Router();
const oneDay = 1000 * 60 * 60 * 24;

const myusername = 'user23'
const mypassword = 'password23'         // In production envi, these are stored in database

var session;                            // a variable to save session
/*******************************************************************/

router.use(sessions({
    name: 'sessions23',
    cookieName: 'session',
    secret: "this_is_my_secret_key_1123581321",     // In production envi, its long & randomly generated
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: true,    
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: false,
    secure: true,
    ephemeral: true    
}));


router.post('/login',(req,res) => {
    console.log(req.cookies);
    if(req.cookies.sessionId23 == 'ABCDEFGHIJKLM') {
        res.send({info: `You are already loggedIn, idiot` });
    }
    else if(req.body.username == myusername && req.body.password == mypassword) {
        session = req.session; 
        session.userid = req.body.username; 
        console.log(req.session);
        res.cookie('sessionId23', 'ABCDEFGHIJKLM');
        res.send({ info:`Hey there, Welcome` });
    }
    else {
        res.send({ error23: 'Invalid username or password' });
    }
});

router.get('/logout', function (req, res) {
    req.session.destroy();
    res.send("logout success!");
});
/*******************************************************************/
module.exports = router;