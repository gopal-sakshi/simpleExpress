const fs = require('fs');
const jwt = require('jsonwebtoken');
var jwtInterface = {};

// var privateKey1  = fs.readFileSync('./privateKey.pem', 'utf8');
// var publicKey1  = fs.readFileSync('./publicKey.pem', 'utf8');        
        // this'll work if you directly run this file
        // like node jwtAuth.js; but if u run from app.js (or) index.js ---> it fails

var privateKey = fs.readFileSync('JWT/privateKey.pem', 'utf8');
var publicKey = fs.readFileSync('JWT/publicKey.pem', 'utf8');


jwtInterface.generateToken = function(payload) {

    // SIGNING OPTIONS
    var signOptions = {
        issuer:  'gopalSimpleExpress',                 // Software organization that issues the token.
        subject:  'some@user.com',                // Intended user of the token.
        audience:  'gopalSimpleExpress_A',               // Basically identity of the intended recipient of the token
        expiresIn:  "10h",          // Expiration time after which the token will be invalid./* 10h, 20d, 120, 120s */
        algorithm:  "RS256"         // Encryption algorithm to be used to protect the token.
    };
    signOptions.expiresIn = payload.expiresIn ? payload.expiresIn: signOptions.expiresIn
    var jwtToken = jwt.sign(payload, privateKey, signOptions);
    // console.log("token23 -----> " + jwtToken);     // Our token is generated    
    return jwtToken;    
}


jwtInterface.verifyToken = function(payload) {
    
    var verifyOptions = {
        issuer:  'gopalSimpleExpress',
        subject:  'some@user.com',
        audience:  'gopalSimpleExpress_A',
        expiresIn:  "60s",
        algorithm:  ["RS256"]       // its Array... but in signOptions --> its string ???
    };

    try {
        var tokenData = jwt.verify(payload, publicKey, verifyOptions);     // here, we use publicKey to verify
        // console.log("JWT verification result: success23 " + JSON.stringify(tokenData));
        return tokenData
    } catch(error) {
        console.log("error @ catch block", error.name);
        if (error.name == jwt.TokenExpiredError.name) {
            return `TOKEN expired @ ${jwt.TokenExpiredError.expiredAt}`;
        } else {
            return 'INVALID TOKEN';
        }        
    }
    
}

module.exports = jwtInterface