// Using this throws ===> address already in use ERROR... so, using present index.js
var http = require('http');
var app = require('./app');
process.title = "simpleExpress"                             // this is used for pidof  ===> process.title
PORT = process.env.PORT || process.argv[2] || 3044;         // use "RENDER" (or) "heroku" provided port

app.set('port', PORT);
var serverInstance = http.createServer(app);      // CREATES SERVER

serverInstance.listen(PORT, ()=> {                // LISTEN method on createServer()
    console.log(`listening on ${PORT}`);
}).on('request', (req,res) => {                   // 'ON' method nested
  // res.write('Hello from node & express');
  // res.write(`server listening at ${this.address().PORT}`);     // IDIOT CODE... this.address() is not a method
}).on('error', onError);
// serverInstance.setTimeout(100, () => {
//   console.log('time out');
// })

// nodemon EADDRINUSE error port already in use... to handle that
process.once("SIGUSR2", () => {
    console.log('sigusr2 hit - closing process')
    serverInstance.close(err => {
      console.log('hello ', process.pid);
      const result = process.kill(process.pid, "SIGUSR2");
      console.log(`process killed ${result}`);              // it seems this wont get executed at all... for some reason its not printed
    });
});
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Http server closed.');
    process.exit();
  });  
})

/*
    RUN this simpleExpress from multiple ports...

    // DONT USE THIS
      nodemon index.js 3045
      nodemon index.js 3046
      nodemon index.js 3047         // it seems I got nodemon command not found... anyway ignore this
                                    // nodemon is only for restarting server as soon as changes are made
                                    // we will only want to this simpleExpress on multiple ports
                                    // at this point, we are not bothered to restart server as soon as changes are made
                                  // if you want to 'RESTART'           ---------> "npm run use_this"

    // USE THESE in 3 terminals.... hit the endpoint "http://localhost:82/otherStuff/port"
      node index.js 3045
      node index.js 3046
      node index.js 3047  
*/

/*

APPROACH 1
  Ways of specifying PORT for a node program
  - PORT=3045 node index.js         --------> Ubuntu.... access 3045 from "process.env.PORT" in code base
  - set PORT=3045 && node file_name.js      -----------> for Windows

APPROACH 2
  'node index.js 3045'
  
  console.log(process.argv);              ----> array of command line arguments
  1st arg = /home/vsspl/......../node         (node path)  
  2nd arg = /home/vsspl/.......index.js       (file path)
  3rd arg = 3045
  ---------> make the port number as 3045   PORT = process.argv[2];

  
*/

function onError(error) {
  switch (error.code) {
    case 'EADDRINUSE':
      console.log('hello34');
      console.error('port is already in use ');
      // process.exit(0);
      break;
    default:
      process.exit(1);
  }
}