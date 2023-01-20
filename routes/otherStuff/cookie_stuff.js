const express = require('express');
const cookieRouter = express.Router();
var cookieParser = require('cookie-parser');
var session = require('express-session');

/******************************************************************************/

cookieRouter.get('/setCookie', function (req, res) {
    // res.cookie('name23', 'edo oka peru le ra', { expire: 360000 + Date.now() }).send('cookie set');
    res.cookie('name23', 'edo oka peru le ra', { maxAge: 360000 }).send('cookie set');
});

// NOT WORKING
cookieRouter.get('/pageCount', cookieParser, session({secret: "Shh, its a secret!"}), (req, res) => {
    if(req.session.page_views){
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times");
    } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
    }
})
/******************************************************************************/
module.exports = cookieRouter;