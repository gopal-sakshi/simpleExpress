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
    const paths = {
        "__dirname": __dirname,
        "cwd": `${process.cwd()}`,
        "./": `${path.resolve("./")}`,
        "filename": __filename,
        "time23": new Date().toISOString()
    }
    res.send({paths: paths});
});

router.get('/novel', (req, res) => {
    console.log('inside get novel');

    // it seems fs module is imported at root (or) project level 
        // so, the file path must be relative to the path - where app.js is located...

    // var readableStream1 =  fs.createReadStream('../../resources/a_tale_of_two_cities.txt')      // wont work
    var readableStream2 =  fs.createReadStream('routes/streams/a_tale_of_two_cities.txt');      // will work
    // var readableStream3 = fs.createReadStream('resources/two_cities_copy.txt');                 // also works
    
    readableStream2.pipe(res);
})

async function timeWaste1() { return new Promise((rs,rj) => { setTimeout(() => rs('streams1'), 2000); }); }
async function timeWaste2() { return new Promise((rs,rj) => { setTimeout(() => rs('streams2'), 3000); }); }

module.exports = router;