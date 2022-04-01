var http = require('http');
var app = require('./app');

PORT = process.env.PORT || 3044;
app.set('port', PORT);
var serverInstance = http.createServer(app);
serverInstance.listen(PORT, ()=> {
    console.log(`listening on ${PORT}`);
});

// nodemon EADDRINUSE error port already in use... to handle that
process.once("SIGUSR2", () => {
    console.log('sigusr2 hit - closing process')
    serverInstance.close(err => {
      console.log('hello ', process.pid);
      const result = process.kill(process.pid, "SIGUSR2");
      console.log(`process killed ${result}`);              // it seems this wont get executed at all... for some reason its not printed
    });
});