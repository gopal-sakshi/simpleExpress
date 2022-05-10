const express = require('express');
const bodyParser= require('body-parser');

const app = express();
const cors = require('cors');

// Express lets us use middleware with the use method.
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(bodyParser.urlencoded({ extended: false }));
// combines the 2 above, then you can parse incoming Request Object if object, with nested objects, or generally any type.
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

// the following origins wont throw CORS error --------------------------> for some reason this didnt work...
// app.use(cors({
//   origin: ['http://localhost:9999/', 'http://localhost:9998/']
// }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9999');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,token');   
  // if you remove token in allow-headers... then, you'll get CORS error for any http request headers with token property  (OR)
  // if http request header has token ---> then access-control-allow-headers MUST contain token ---> so that it wont throw cors error
  // or simply you can do this -----> Access-Control-Allow-Headers, '*'

  res.setHeader('Access-Control-Allow-Credentials', true);  
  next(); 
})

const authRouter = require('./routes/auth/auth23.router');
const bufferRouter = require('./routes/buffers/bufferRouter');
const headerRouter = require('./routes/headers/headersRouter');
const quoteRouter = require('./routes/quotes/quoteRouter');
const streamRouter = require('./routes/streams/streamRouter');
const moduleCacheRouter = require('./routes/moduleCache/moduleCache');
const otherStuffRouter = require('./routes/otherStuff/otherStuff23.router')


app.use('/auth', authRouter);
app.use('/buffer', bufferRouter);
app.use('/header', headerRouter);
app.use('/quote', quoteRouter);
app.use('/stream', streamRouter);
app.use('/moduleCache', moduleCacheRouter);
app.use('/otherStuff',otherStuffRouter);

module.exports = app;