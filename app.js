const express = require('express');
const bodyParser= require('body-parser');

const app = express();

const streamRouter = require('./routes/streams/streamRouter');
const bufferRouter = require('./routes/buffers/bufferRouter');
const quoteRouter = require('./routes/quotes/quoteRouter');


// Express lets us use middleware with the use method.
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/stream', streamRouter);
app.use('/buffer', bufferRouter);
app.use('/quote', quoteRouter);

// this is to see the http incoming message ...
// app.use(function (req, res, next) {
//   console.log(req) // populated!
//   next()
// });

app.listen(3044, function() {
  console.log('listening on 3044')
});

app.post('/addQuote', (req, res) => {
  console.log('hello');
})