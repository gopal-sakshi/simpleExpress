const express = require('express');
const https = require('https');
const otherRouter = express.Router();
const fs = require('fs').promises;
const axios54 = require('axios');
/********************************************************************** */
otherRouter.get('/port', (req,res) => {
    console.log(`you've port`);
    console.log('local Port = ', req.socket.localPort);
    console.log('remote Port = ', req.socket.remotePort);
    console.log('port from req headers ',req.headers.host);    
    // res.write(`you've hit ${req.socket.localPort}`);            // Cannot set headers after they are sent to the client
    res.send(`response is ${req.socket.localPort}`);
})

otherRouter.put('/cors', (req, res) => {
    console.log(req.body);
    let url19 = 'https://api.postalpincode.in/pincode/'+req.body.pincode
    axios54({ method:'get', url: url19})
        .then(response => {
            let resp23 = {
                pincodesList23: response.data,
                success23: true,
                error23: false                 
            } 
            res.send(JSON.stringify(resp23)); 
        })
        .catch(error => { console.log(error); res.send({
            pincodesList23: {},
            success23: false,
            error23: 'phattu, enduko mari'
        });
    });    
});

// this matches all routes 
    // localhost:3044/otherStuff/page/211
    // localhost:3044/otherStuff/discussion/87
otherRouter.get(/^\/(discussion|page)\/(.+)/, (req, res) => {
    console.log(req.params[0]);
    console.log(req.params[1]);
    res.send({param1:req.params[0] , param2:req.params[1] });
});


otherRouter.get('/apiCall', async (req, res) => {
    const url = 'https://official-joke-api.appspot.com/jokes/programming/random';
    
    // using axios
    // var joke33 = await axios54.get(url, { headers : { 'Accept-Encoding': 'application/json' }});
    // res.send(joke33.data);

    // using fetch
    // const joke34 = await fetch(url);
    // // res.send(joke34.json());                 // WONT WORK
    // res.send(await joke34.json());

    // using https
    https.get(url, (response) => {
        let data = '';
        response.on('data', (chunk) => { data = data + chunk.toString(); });    
        response.on('end', () => { res.send(JSON.parse(data)); });
    }).on('error', (err) => { res.send(err) }).end();
});


// this route will give Timed Out after 2 seconds;
otherRouter.get('/timeout23', (req, res) => {
    req.setTimeout(200, (req, res) => {
        res.send('Timed Out!!! BHAK!!!');
    });
    for(let i=0; i<1e9; i++) {}
    res.send('time out avvaledu');
});


// file operations...
otherRouter.get('/readFile23', async(req,res) => {
    const fileContents = await fs.readFile('resources/readMe.txt');
    console.log(fileContents.toString());
    res.send('gooddu');
});

// next Callback
// next() is part of connect which inturn is an express dependency. 
    // The purpose of calling next() is to trigger the next middle ware in express stack.
otherRouter.get('/nextCb', isGoodBoy, (req,res) => {
    res.send('next() gurinchi ardham ayindaa');
});
/********************************************************************** */

function isGoodBoy(req,res,next) {    
    // do some validation checks... req.headers & stuff...
    if(req.body.shouldAllow) { return next(); } 
    else { res.send('pampanu ra rey...'); }    
}

/********************************************************************** */

module.exports = otherRouter;