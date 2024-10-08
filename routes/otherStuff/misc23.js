const express = require('express');
const https = require('https');
const miscRouter = express.Router();

// using CORS for all routes in miscRouter
var cors = require('cors');
miscRouter.use(cors())
/********************************************************************** */
miscRouter.get('/openresty23', (req,res) => {
    console.log(`rcvd headers ===> `, req.headers);
    res.setHeader('chiru_swag23', 'rowdy_alludu_lo_auto_jani');
    res.setHeader('idi_hide_autundi', 'annayya_lo_rajaram');
    res.status(200).send({
        info: `hmmm, openresty upstream proxy working eh, res headers choodu`,
        moreInfo: `nginx openresty23 nunchi ===> simpleExpress ki forward chesindi ee request`,
        headers23: `simpleExp 2 headers pampiste, okate raavali... nginx must stop one header`,
        time23: new Date().toISOString()
    });
});

miscRouter.get('/openresty24', (req,res) => {
    console.log("upstream ki vachindiii ", new Date().toISOString())
    res.status(200).send({
        info: `hmmm, openresty caching`,
        time23: new Date().toISOString()
    });
});

miscRouter.get('/openresty25/rateLimit1', (req,res) => {
    console.log("rateLimit1 ", new Date().toISOString())
    res.status(200).send({
        info: `hmmm, openresty caching`,
        time23: new Date().toISOString()
    });
});

miscRouter.get('/forward23', (req,res) => {
    console.log("forward23 ===> ", req.socket.localPort, req.socket.remotePort, req.headers.port, req.headers.origin);
    console.log("forward24 ===> ", req.socket.remoteAddress, "__", req.get('host'), "__", req.get('origin'));
    console.log("headers ===> ", req.headers["header45"], req.headers["header46"])
    res.status(200).send({
        info1: `forward proxy23`,
        info2: ` openresty lo set chesina headers choodu`,
        headers11: { 11: req.headers["header45"], 12: req.headers["header46"]},
        time23: new Date().toISOString(),

    });
});

// Server SENT Events (SSE); server-sent-events
miscRouter.get('/server-sent-events23', sseHandler23);
miscRouter.post('/server-sent-events23', postFacts23);


/********************************************************************************/
miscRouter.get('/server-sent-events24', require('./misc23_sse24').sseHandler24);

/********************************************************************************/
/*
    HOW to test SSEs
    - open two terminals --->       curl -H Accept:text/event-stream http://localhost:3044/misc22/server-sent-events23
    - open postman ---> http://localhost:3044/misc22/server-sent-events23
*/

async function postFacts23(req, res, next) {
    const newFact = req.body;
    facts.push(newFact);
    res.json(newFact)
    return sendEventsToAll(newFact);
}

function sendEventsToAll(newFact) {
    clients.forEach(client => client.res.write(`data: ${JSON.stringify(newFact)}\n\n`))
}

let clients = [];
let facts = [];

async function sseHandler23(req, res, next) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    }
    res.writeHead(200, headers);

    const data = `data: ${JSON.stringify(facts)}\n\n`;
    res.write(data);
    const clientId = Date.now();
    const newClient = { id: clientId, res }
    clients.push(newClient);

    req.on('close', () => {
        console.log(`${clientId} connection closed`);
        clients = clients.filter(client => client.id != clientId);
    });
}

/***********************************************************************/

// redis pub-sub


/***********************************************************************/

module.exports = miscRouter;