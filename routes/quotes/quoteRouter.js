var express = require('express');
const { body, param, validationResult } = require('express-validator');
const path = require('path');
var router = express.Router();
const fs = require('fs');
const fsPromise = require('fs').promises;

router.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../../resources') });
    // we told Express to serve an index.html file 
});

router.get('/getIp', (req, res) => {
    var responseObject = { remoteAddr: req.socket.remoteAddress, ip: req.ip };
    console.log(req.socket.remoteAddress);  // ::1 ====> same as '127.0.0.1'
                                            // which is the IPv4 version of the loopback address; ::1 is IPv6
    res.status(200).json(responseObject);
});

// for some reason, it isnt working... look into it later...
router.post('/addQuote', (req, res) => {
    console.log('Hellooooooooooooooooo!');
    console.log(req.body);
    res.status(200).send('your quote received');
});

/********************************************************* */
const addCommentFn23 = async (req, res, leagueName) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }
    fs.appendFile('resources/comments12.txt', JSON.stringify(req.body)+'\n', (err) => {
        if(err) res.send('phattu');
        else res.send('data appended');
    });    
}
const isPageIdValid = (pageId) => pageId > 43 ? false:true;
async function checkEmailExists(email) {
    const data = await fsPromise.readFile('resources/comments12.txt', { encoding: 'utf-8' });    
    return new Promise((resolve, reject) => {
        if(data.includes(email)) reject('email already registered');
        else resolve(true);
    });
}
router.post(
    '/addComment/:pageId',
    param('pageId').exists().toInt().custom(pageId => isPageIdValid(pageId)),
    body('email23').isEmail().normalizeEmail(),
    body('email23').custom(value => { return checkEmailExists(value)}),
    body('comment22').not().isEmpty().trim().escape(),
    body('password').isLength({ min: 5 }),
    body('confirmPassword').custom((value, {req}) => value == req.body.password),
    addCommentFn23);



/*
    .bail()                 Stops running validations if any of the previous ones have failed.
    .custom(validator)      add custom validator
    .exists                 check for the existence of the current fields in the request
    
    https://express-validator.github.io/docs/validation-chain-api/

    Validation Chain API
    Sanitization Chain API
*/
/********************************************************* */
module.exports = router;