const express = require('express');
const cookieRouter = express.Router();
var cookieParser = require('cookie-parser');
var session = require('express-session');

/******************************************************************************/

cookieRouter.get('/setCookie1', function (req, res) {
    res.cookie('cookie1Key', 'used_res.cookie', { maxAge: 360000 }).send('cookie set');
});

cookieRouter.get('/clearCookies', (req, res) => {
    res.clearCookie('cookie12', {path: '/'});
    // res.clearCookie('cookie1Key');
    res.end();
});

cookieRouter.get('/setCookie2', (req,res) => {
    const name12 = `cookie2Key=used_res.setHeader()`;
    const path12 = `path=/`;        // NOT WORKING ===> `path=/cookieStuff`
                                        // Without path12, cookie will not be set on browser... 
    const options1 = `SameSite=None; Secure; HttpOnly`;     // HttpOnly ===> cookie not visible on browser
    const options2 = `SameSite=None; Secure;`;
    res.setHeader('Set-Cookie', `${name12}; ${path12}; ${options2}`);
    res.send({ info: 'setCookie2 path hit23' });
});

cookieRouter.get('/seeCookies', (req,res) => {
    console.log(req.cookies);
    res.send({data: req.cookies, info: 'these are the cookies stored in your browser'});
})

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