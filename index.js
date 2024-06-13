var app = require('./app');
var debug = require('debug')('footballbackend:server');
var http = require('http');
process.title = "simpleExpress"
/***************************************************************** */
var port = normalizePort(process.env.PORT || '3044');
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
process.on('SIGINT', () => {
    server.close(() => {
        console.log('Http server closed.');
        process.exit();
    });
})

require('./routes/otherStuff/redis23').redisServer23(server);
app.use('/redis12', require('./routes/otherStuff/redis23').redisRouter);

/***************************************************************** */
function normalizePort(val) {

    var port = parseInt(val, 10);
    if (isNaN(port)) { return val; }
    if (port >= 0) { return port; }
    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    // hello

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Portt ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.log('hello34');
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            process.exit(1);
        // throw error;
    }
}

function onListening() {
    var addr = server.address();
    console.log('listening on port: ', addr.port);
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

process.on('SIGINT', function() {
    console.log( "\nGracefully shutting down23 from SIGINT (Ctrl-C)" );
    process.exit(0);
});
/***************************************************************** */