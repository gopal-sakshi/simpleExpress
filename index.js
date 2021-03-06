var http = require('http');
var app = require('./app');

PORT = process.env.PORT || process.argv[2] || 3044;

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