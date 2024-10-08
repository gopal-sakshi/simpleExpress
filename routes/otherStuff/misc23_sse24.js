async function sseHandler24(req, res, next) {
    console.log("server sent events ", Date.now());
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Connection': 'keep-alive', 'Cache-Control': 'no-cache' });    
    req.on('close', () => {
        console.log(`connection closed ${new Date().toISOString()}`);        
    });

    // sseRandom23(res);               // random (or) current Time
    // countdown(res, 10);         // countdown from 10 to 1
    text23(res);                   // show text one word at a time;
}

async function sseRandom23(res) {
    // res.write("data: " + (Math.floor(Math.random() * 1000) + 1) + "\n\n");           // RANDOM NUMBER
    res.write("data: " + JSON.stringify({time23: new Date().toISOString()}) + "\n\n");  // TIME
    setTimeout(() => sseRandom23(res), 1000);
}

function countdown(res, count) {
    res.write("data: " + count + "\n\n")
    if (count) { setTimeout(() => countdown(res, count-1), 1000) }
    else { res.end() }
}

let string23 = 'Real Madrid is the most successful club in Champions League history';
let offset = 0; charactersAtOnce = 1;
function text23(res) {
    if(offset < string23.length) {
        let char = string23.slice(offset++, charactersAtOnce++)
        res.write("data: " + JSON.stringify({time23: char}) + "\n\n");
        setTimeout(() => text23(res), 100);
    } else {
        offset = 0; charactersAtOnce = 0;
        res.end()
    }
}

module.exports = {
    sseHandler24
}