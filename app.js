const express = require('express');
const bodyParser= require('body-parser');

const app = express();
const cors = require('cors');

// built-in middleware express.static to serve static files, such as images, CSS, JavaScript
  // run testing angular repo... http://localhost:9999/
app.use(express.static('public23'));


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

// req.ip will return the real IP address even if behind proxy
app.set('trust proxy', true)

app.use(function (req, res, next) {
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9999');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,token');   
  // if you remove token in allow-headers... then, you'll get CORS error for any http request headers with token property  (OR)
  // if http request header has token ---> then access-control-allow-headers MUST contain token ---> so that it wont throw cors error
  // or simply you can do this -----> Access-Control-Allow-Headers, '*'
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);  
  next(); 
})

const authRouter = require('./routes/auth/auth23Router');
const bufferRouter = require('./routes/buffers/bufferRouter');
const headerRouter = require('./routes/headers/headersRouter');
const quoteRouter = require('./routes/quotes/quoteRouter');
const streamRouter = require('./routes/streams/streamRouter');
const moduleCacheRouter = require('./routes/moduleCache/moduleCache');
const miscRouter = require('./routes/otherStuff/port-cors-misc');
const soap14Router = require('./routes/otherStuff/soap14Router');
const fileUploadRouter = require('./routes/otherStuff/file-upload23');
const cookieRouter = require('./routes/otherStuff/cookie_stuff');
const footballRouter = require('./routes/otherStuff/football23');
const sessionRouter = require('./routes/session12/session12Router');
// DO NOT USE this route here... Bcoz, it matches all routes
// app.use('/', (req, res) => {
//   res.send('<h1>Welcome to simple Express</h1><div>Use this routes - /stream, /quote </div>');
// });


// LOAD TESTING ===> use apache bench marking tool
  // ab -n 1000 -c 100 http://localhost:3044/stream
  // see apache-bench
app.use('/auth', authRouter);
app.use('/buffer', bufferRouter);
app.use('/header', headerRouter);
app.use('/quote', quoteRouter);
app.use('/stream', streamRouter);
app.use('/moduleCache', moduleCacheRouter);
app.use('/otherStuff',miscRouter);
app.use('/soap14', soap14Router);
app.use('/fileUpload23', fileUploadRouter);
app.use('/cookieStuff', cookieRouter);
app.use('/football23', footballRouter);
app.use('/sessions12', sessionRouter);

// Middlewares can be chained. We can use more than one middleware on an Express app instance
  // middlewares can be applied on "app.use()"    (or) app.METHOD (like app.put(), app.get() )
  // you can also use REST params ====> app.get("/middleware24", ...middlewares)
app.use('/middleware23', 
  function (req, res, next) { req.middlewares = ["middleware1"]; next() },
  function (req, res, next) { req.middlewares.push("middleware2"); next() },
  function (req, res, next) { req.middlewares.push("middleware3"); res.json(req.middlewares) }
  );



// Use this at the last... if you use it at first, all /auth, /buffer ---> matches this route
app.use('/', (req, res) => {
  res.send('<h1>Welcome to simple Express</h1><div>Use this routes - /stream, /quote </div>');
});

module.exports = app;