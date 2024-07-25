var express = require('express');
var authRouter = express.Router();
const fs = require('fs');
var path = require("path");
var jwtInterface = require('../../JWT/jwtAuth_RS256');
var passport23 = require('./passport23');

authRouter.put('/signin', (req, res) => {
    const result = validateSignin(req.body);    
    result.then(({ jwtToken, refreshToken }) => {
        if(jwtToken && refreshToken) {
            let responseObject = {
                code: 200, 
                data: '',
                info: 'signIn success', 
                userName:req.body.userName, 
                access_token: jwtToken,
                refresh_token: refreshToken
            };
            debugger
            res.setHeader('content-type', 'application/json');
            res.send(responseObject);   
        } else {            
            res.status(400).send('invalid login details');            
        }
    })    
});

authRouter.post('/refreshToken23', (req, res) => {
    let { access_token } = validateToken(req.body.refresh_token);
    if(access_token == req.body.access_token) { 
        console.log("this is the right combo of access & refresh tokens");  // generate new tokens & send him
        let resp = generateTokens({ userName: req.body.userName});
        res.send({
            access_token: resp.jwtToken, 
            refresh_token: resp.refreshToken, 
            userName: req.body.userName
        });
    } else {
        console.log("access_token not matched ");
        res.status(200).send({info: 'refresh token pani cheyyaledu'})
    }
});

authRouter.put('/signup', async (req, res) => {
    // console.log('inside signup');
    // console.log(req.body);
    const result44 = await appendFile23(req.body);
    console.log(result44);
    res.setHeader('content-type', 'application/json');
    if(message) { 
        let responseObject = {code: 200, data: '',info: 'signUp success' }
        res.send(responseObject);
    } else {
        let responseObject = {code: 500, data: '',info: 'signUp failed' }
        res.send(responseObject);
    }
});

authRouter.get('/seeRumours', (req, res) => {
    const result44 = validateToken(req.headers.token);
    if(typeof result44 == 'string' && result44.includes('expired')) {
        res.status(401).send('expired auth token');
    } else if(typeof result44 == 'string' && result44.includes('INVALID')) {
        res.status(401).send('expired auth token - invalid');
    } else {
        res.status(200).send({ 
            data: `madrid lanti club ante rumours common ${new Date().toISOString()}`,
            info: result44
        });
    }
});

authRouter.get('/secretArticles', (req, res) => {
    console.log(req.headers);
    const result44 = validateToken(req.headers.token);
    
    if(typeof result44 == 'string' && result44.includes('expired')) {
        res.status(401).send('expired auth token');
    } else if(typeof result44 == 'string' && result44.includes('INVALID')) {
        res.status(401).send('expired auth token - invalid');
    } else {
        res.status(200).send({ 
            data: `there is secret portugese camp within madrid dressing room ${new Date().toISOString()} `,
            info: result44
        });
    }
})


authRouter.get('/noAccess23', (req, res) => {
    res.send({info: 'neeku access ledu babai', msg: 'no access324'})
})


function generateTokens(payload) { 
    // While generating the token --> dont use password in payload 23
    // because, if you decode the token, you can see userName, password, subject, audience, expiresIn 
    // WRONG
    // let payload23 = { userName: payload.userName, password: payload.password, expiresIn: '10s' };

    let payload23 = { userName: payload.userName, expiresIn: '10s' };               // RIGHT
    let payload24 = { userName: payload.userName, expiresIn: '31556952' };      // expires in 1 year

    const jwtToken = jwtInterface.generateToken(payload23);
    payload24.access_token = jwtToken;      // refreshToken also holds access_token
    const refreshToken = jwtInterface.generateToken(payload24);
    return { jwtToken, refreshToken, userName: payload.userName }
}
async function validateSignin(payload) {
    const userAccounts23 = `${path.resolve("./")}`+'/resources/userAccounts.txt';
    const dataToCheck = payload.userName + '_' + payload.password;


    return new Promise((resolve,reject) => {
        fs.readFile(userAccounts23, 'utf8', (err, data) => {
            // if no encoding is specified like utf-8, then raw data (buffer) is returned
            // console.log(JSON.stringify(data));
            if(data.includes(dataToCheck)) {
                resolve(generateTokens(payload));
            }
            else resolve(false);
        });
    });
}

async function appendFile23(payload) {
    const userAccounts23 = `${path.resolve("./")}`+'/resources/userAccounts.txt';
    const dataToWrite = payload.userName + '_' + payload.password + '\r\n';
    // console.log(userAccounts23);
    // console.log(dataToWrite);
    return new Promise ((resolve, reject) => {
        fs.appendFileSync(userAccounts23, dataToWrite, (err) => {
            if(err) reject(false);
            else {
                console.log(dataToWrite);
                resolve(true);
            }
        });
    }); 
}

function validateToken(payload) {
    const result = jwtInterface.verifyToken(payload);
    // console.log('token details = ', typeof result, JSON.stringify(result));
    console.log('token details = ', typeof result);
    return result;
    // return new Promise((resolve, reject) => {
    //     resolve(result);
    // }); 
}

module.exports = authRouter 