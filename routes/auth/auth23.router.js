var express = require('express');
var authRouter = express.Router();
const fs = require('fs');
var path = require("path");
var jwtInterface = require('../../JWT/jwtAuth');

authRouter.put('/signin', (req, res) => {
    
    console.log('inside signInnn');    
    console.log(req.body);
    const result = validateSignin(req.body);    
    result.then(jwtToken => {
        if(jwtToken) {
            let responseObject = {code: 200, data: '',info: 'signIn success', userName:req.body.userName, password: req.body.password, token: jwtToken};
            res.setHeader('content-type', 'application/json');
            res.send(responseObject);   
        } else {            
            res.status(400).send('invalid login details');            
        }
    })
    
});

authRouter.put('/signup', (req, res) => {
    // console.log('inside signup');
    // console.log(req.body);
    const result44 = appendFile23(req.body);
    console.log(result44);
    res.setHeader('content-type', 'application/json');
    result44.then(message => {
        if(message) { 
            let responseObject = {code: 200, data: '',info: 'signUp success' }
            res.send(responseObject);
        } else {
            let responseObject = {code: 500, data: '',info: 'signUp failed' }
            res.send(responseObject);
        }
    }).catch(err => res.send({code: 500, info:'Internal server error'}));
});

authRouter.get('/seeRumours', (req, res) => {
    const result44 = validateToken(req.headers.token);
    result44.then(details => {
        console.log(details)
        if(typeof details == 'string' && details.includes('expired')) {            
            res.status(400).send('expired auth token');
        }        
        else {
            res.status(200).send({ 
                data: 'secret Rumour - RM',
                info: details
            });
        }        
    }).catch(error => {
        res.send({
            code: 400,
            info: 'something went wrong'
        })
    })
})
authRouter.get('/secretArticles', (req, res) => {
    console.log(req.headers);
    const result44 = validateToken(req.headers.token);
    result44.then(details => {
        console.log(details)
        if(typeof details == 'string' && details.includes('expired')) {
            // res.send(400).send('expired auth token');               // its not res.send().send() ----> its res.status().send()
            res.status(400).send('expired auth token');
        }        
        else {
            res.status(200).send({ 
                data: 'secret Article - RM',
                info: details
            });
        }
        // console.log('will this be logged even after res.send ??');   // yes, it will be logged
    }).catch(error => {
        console.log(error);
        res.send({
            code: 400,
            info: 'somethingey went wrong'
        })
    })
})

async function validateSignin(payload) {
    const userAccounts23 = `${path.resolve("./")}`+'/resources/userAccounts.txt';
    const dataToCheck = payload.userName + '_' + payload.password;

    let payload23 = {
        userName: payload.userName,
        password: payload.password
    };
    return new Promise((resolve,reject) => {
        fs.readFile(userAccounts23, 'utf8', (err, data) => {    // if no encoding is specified like utf-8, then raw data (buffer) is returned
            // console.log(JSON.stringify(data));
            if(data.includes(dataToCheck)) {
                const jwtToken = jwtInterface.generateToken(payload23);
                resolve(jwtToken);
            }
            else resolve(false);
        });
    });
}

async function appendFile23(payload) {
    const userAccounts23 = `${path.resolve("./")}`+'/resources/userAccounts.txt';
    const dataToWrite = payload.userName + '_' + payload.password + '\r\n';
    console.log(userAccounts23);
    console.log(dataToWrite);
    fs.appendFileSync(userAccounts23, dataToWrite, (err) => {
        console.log(err);
        return false;
    });
    return true;
}

async function validateToken(payload) {
    const result = jwtInterface.verifyToken(payload);
    console.log('token details = ', JSON.stringify(result));
    return new Promise((resolve, reject) => {
        resolve(result);
    }); 
}

module.exports = authRouter 