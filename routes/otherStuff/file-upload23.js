const express = require('express');
const fileUploadRouter = express.Router();

fileUploadRouter.post('/', (req, res) => {
    console.log(req.body);
    var response23 = {
        info: 'undavayya',
        status: 'assalu teliyadu'
    }
    res.status(200).json(response23);
})


module.exports = fileUploadRouter;