var express = require('express');
var path = require("path");

var router = express.Router();
var fs = require('fs');

router.get('/', (req, res) => {
    res.send('Welcome to streams');
});

router.get('/endpoint1', async (req, res) => {
    const result = await timeWaste1();
    res.setHeader('Content-Type', 'application/json');
    res.send(result);
});

router.get('/endpoint2', async (req, res) => {
    const result = await timeWaste2();
    res.setHeader('Content-Type', 'application/json');
    res.send(result);
});

router.get('/path', (req, res) => {
    console.log("__dirname:    ", __dirname);
    console.log("process.cwd() : ", process.cwd());
    console.log("./ : ", path.resolve("./"));
    console.log("filename: ", __filename);
    res.send('paths printed in console');
});

router.get('/novel', (req, res) => {
    console.log('inside get novel');

    // it seems fs module is imported at root (or) project level 
        // so, the file path must be relative to the path - where app.js is located...

    // var readableStream1 =  fs.createReadStream('../../resources/a_tale_of_two_cities.txt')      // wont work
    var readableStream2 =  fs.createReadStream('routes/streams/a_tale_of_two_cities.txt');      // will work
    var readableStream3 = fs.createReadStream('resources/two_cities_copy.txt');                 // also works
    
    readableStream2.pipe(res);
})

async function timeWaste1() {
    return new Promise((resolve, rej) => {
        setTimeout(() => resolve('streams-endpoint1'), 2000);
    })
}

async function timeWaste2() {
    return new Promise((resolve, rej) => {
        setTimeout(() => resolve('streams-endpoint2'), 3000);
    })
}

module.exports = router;