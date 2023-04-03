const jwt = require('jsonwebtoken');



/**************************************************************************/
function generateToken(payload) {
    const secretKey = 'jingChakSarissa';
    var signOptions = {
        issuer:  'issuer23',
        subject:  'subject23@user.com',
        audience:  'audience23',
        expiresIn:  "10h",
        algorithm:  "HS256"
    };
    var jwtToken = jwt.sign(payload, secretKey, signOptions);
    console.log("token23 -----> " + jwtToken);
    return jwtToken;
}
const payload22 = { name: 'GopAL', age:33, hobbies: ["chess", "football"]};
// const token23 = generateToken(payload22);
// console.log(token23);
/**************************************************************************/


/**************************************************************************/
function validateToken(token) {
    const secretKey = 'jingChakSarissa';
    var signOptions = {
        issuer:  'issuer23',
        subject:  'subject23@user.com',
        audience:  'audience23',
        expiresIn:  "10h",
        algorithm:  "HS256"
    };
    return jwt.verify(token, secretKey, signOptions);
}
const data11 = validateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR29wQUwiLCJhZ2UiOjMzLCJob2JiaWVzIjpbImNoZXNzIiwiZm9vdGJhbGwiXSwiaWF0IjoxNjgwNTIzMTM2LCJleHAiOjE2ODA1NTkxMzYsImF1ZCI6ImF1ZGllbmNlMjMiLCJpc3MiOiJpc3N1ZXIyMyIsInN1YiI6InN1YmplY3QyM0B1c2VyLmNvbSJ9.j3p-92o4DsGHtUrEv2AnDXWAvPSfhSkS39gnegbyusE');
console.log(data11);
/**************************************************************************/