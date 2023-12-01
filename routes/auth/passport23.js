const passport = require('passport');
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local");

function localFn23(userName, password, done) {
    console.log('waitinggggggggggggggggggggggggggggggggggg')
    if(userName == 'priya') { 
        console.log('welcomeeeeeeeeeeeeeeee priya ', userName);
        return done(null, {user: `${userName}_validated`, time: Date.now() })
    } else {
        return done({ error: 'phatt23' })
    }

}

passport.use(new LocalStrategy(localFn23));


function guestMiddleware () {

}

function adminMiddleware () {
    
}

function userMiddleware () {
    
}

function localCb23(req, res, next) {
    console.log('inside local Cb2323');
    next();
}

function simpleCheck() {
    console.log('ssss4434');
    return [ passport.authenticate('local', localCb23) ]
}
module.exports = {
    userMiddleware: userMiddleware,
    adminMiddleware: adminMiddleware,
    guestMiddleware: guestMiddleware,
    simpleCheck: simpleCheck
}