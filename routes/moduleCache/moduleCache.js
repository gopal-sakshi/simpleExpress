var express = require('express');
var router = express.Router();




// it seems require needs relative path... filesystem needs absolute path from where the index.js is run
var file23 = require('../../resources/moduleCache1.json')
var file24 = require('../../resources/moduleCache2.json')

router.get('/compare', (req, res) => {
    res.send('hello');
});

router.get('addToJson', (req, res) => {
    
})

module.exports = router;


/*
    modules are cached after the first time they are loaded
    They are placed in the require.cache. 
    This means that every future require for a previously loaded module 
        will load the same object that was loaded by the first require.
    If there is some code you want to be executed on each re-require of the module, 
        you should export a function instead, and manually invoke that function in each relevant location.

*/