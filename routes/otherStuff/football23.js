const express = require('express');
const footballRouter = express.Router();
const playersStream = require('../../resources_football/players_stream.json');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument1 = require('./football_swagger12.json');

footballRouter.use('/api-docs', swaggerUi.serve);
footballRouter.get('/api-docs', swaggerUi.setup(swaggerDocument1));


footballRouter.get('/stream', async(req, res) => {
    console.log(req.query);
    res.send(playersStream.slice(parseInt(req.query.offset), parseInt(req.query.offset) + parseInt(req.query.limit)));
});

footballRouter.post('/stream', async(req, res) => {
    console.log(req.body);
    res.send('post requset received');
});

footballRouter.post('/swagger11/route1', async(req, res) => {
    console.log("req.body ====> ", req.body);
    if(!req.body.id23) {
        res.status(404).send({info: "poindi1"})
    } else if(!req.body.name23) {
        res.status(405).send({info: "poindi2"})
    } else {
        res.status(200).send({
            time23: new Date().toISOString(),
            isValid : true,
            id222: req.body.id23,
            name222: req.body.name23
        });
    }

});

// console.log(playersStream.slice(10, 15));

module.exports = footballRouter;