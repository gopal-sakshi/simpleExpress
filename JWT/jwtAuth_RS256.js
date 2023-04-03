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
        expiresIn:  "10h",          // Expiration time after which the token will be invalid.
        /*  
                    expiresIn: "10h" // it will be expired after 10 hours
                    expiresIn: "20d" // it will be expired after 20 days
                    expiresIn: 120 // it will be expired after 120ms
                    expiresIn: "120s" // it will be expired after 120s
        */
        algorithm:  "RS256"         // Encryption algorithm to be used to protect the token.
    };

    var jwtToken = jwt.sign(payload, privateKey, signOptions);
    console.log("token23 -----> " + jwtToken);     // Our token is generated    
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
        console.log("JWT verification result: " + JSON.stringify(tokenData));
        return tokenData
    } catch(error) {
        console.log(error);
        if (error.name == jwt.TokenExpiredError.name) {
            return `TOKEN expired @ ${jwt.TokenExpiredError.expiredAt}`
        } else {
            return 'INVALID TOKEN'
        }        
    }
    
}

module.exports = jwtInterface