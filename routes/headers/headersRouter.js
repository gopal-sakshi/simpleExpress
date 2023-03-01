var express = require('express');
var router = express.Router();
var path = require("path");
// const { AsyncLocalStorage } = require("async_hooks");
// const asyncLocalStorage = new AsyncLocalStorage();

router.get('/', (req, res) => {
    // learn how to implement asyncLocalStorage across multiple modules
    // const id = asyncLocalStorage.getStore().get("requestId");
    // res.status(200).send(`You are at header Home with requestID ===> ${id}`);
    
    res.status(200).send(`You are at header Home`);
});

router.get('/pdf', (req, res) => {
    console.log('inside get pdf');
    console.log(`${path.resolve("./")}`+'/resources/aa_somePdf.pdf');
    // res.send('waitu, will send pdf')
    res.sendFile(`${path.resolve("./")}`+'/resources/aa_somePdf.pdf');
});

router.get('/image', (req, res) => {
    console.log('inside get image');
    console.log(`${path.resolve("./")}`+'/resources/aa_somePdf.pdf');
    res.sendFile(`${path.resolve("./")}`+'/resources/aa_elephant.jpg')
});

router.get('/renderHTML', (req, res) => {
    console.log('inside render HTML');
    // it seems we need to something related to view engine - Pug, Jade, EJS
    // res.render(`${path.resolve("./")}`+'/resources/aa_renderThis.html');
});

router.get('/download', (req, res) => {
    console.log('inside download method');
    res.download(`${path.resolve("./")}`+'/resources/aa_download_two_cities.txt');
});
module.exports = router