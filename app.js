const express = require('express');
const bodyParser= require('body-parser');

const app = express();


// Express lets us use middleware with the use method.
app.use(bodyParser.urlencoded({ extended: true }));
/*  we call app.use(bodyParser) before defining our route. 
      The order here matters. 
      This will ensure that the body-parser will run before our route, 
        which ensures that our route can then access the parsed HTTP POST body.
*/
// middleware to see request object   // this is to see the http incoming message ...
// app.use(function (req, res, next) {
//   console.log(req) // populated!
//   next();
// });

// middleware to see process details... other details
// app.use(function(req, res, next) {  
//   console.log(process.pid);
//   next();
// });

const authRouter = require('./routes/auth/auth23.router');
const bufferRouter = require('./routes/buffers/bufferRouter');
const headerRouter = require('./routes/headers/headersRouter');
const quoteRouter = require('./routes/quotes/quoteRouter');
const streamRouter = require('./routes/streams/streamRouter');




app.use('/auth', authRouter);
app.use('/buffer', bufferRouter);
app.use('/header', headerRouter);
app.use('/quote', quoteRouter);
app.use('/stream', streamRouter);



module.exports = app;