const fs = require('fs');
const jwt = require('jsonwebtoken');

// PAYLOAD
var payload = {
    data1: "Data 1",
    data2: "Data 2",
    data3: "Data 3",
    data4: "Data 4",
};

// PRIVATE and PUBLIC key
var privateKEY  = fs.readFileSync('./privateKey.pem', 'utf8');
var publicKEY  = fs.readFileSync('./publicKey.pem', 'utf8');

var i  = 'gopalSimpleExpress';          // Issuer 
var s  = 'some@user.com';               // Subject 
var a  = 'gopalSimpleExpress_A';        // Audience

// SIGNING OPTIONS
var signOptions = {
    issuer:  i,                 // Software organization that issues the token.
    subject:  s,                // Intended user of the token.
    audience:  a,               // Basically identity of the intended recipient of the token
    expiresIn:  "12h",          // Expiration time after which the token will be invalid.
    algorithm:  "RS256"         // Encryption algorithm to be used to protect the token.

};

var jwtToken = jwt.sign(payload, privateKEY, signOptions);
console.log("token23 -----> " + jwtToken);     // Our token is generated


var verifyOptions = {
    issuer:  i,
    subject:  s,
    audience:  a,
    expiresIn:  "12h",
    algorithm:  ["RS256"]       // its Array... but in signOptions --> its string ???
};

var isVerified = jwt.verify(jwtToken, publicKEY, verifyOptions);     // here, we use publicKey to verify
console.log("JWT verification result: " + JSON.stringify(isVerified));



