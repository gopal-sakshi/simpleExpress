const express = require('express');
const bodyParser= require('body-parser');

const app = express();

// Express lets us use middleware with the use method.
app.use(bodyParser.urlencoded({ extended: true }));
/*
    urlencoded method within body-parser tells body-parser to extract data from the <form> element 
    AND add them to the body property in the request object.
*/

// https://zellwk.com/blog/crud-express-mongodb/



app.listen(3044, function() {
  console.log('listening on 3044')
});

function explanation() {
/*

    Browsers perform the READ operation when you visit a website.
    Under the hood, they send a GET request to the server to perform this READ operation.
    You see "cannot get /"" because our server sent nothing back to the browser.

    app.get(endpoint, callback)

    (A) endpoint = the value that comes after your domain name. Here are some examples:

    When you visit localhost:3000, you’re actually visiting localhost:3000/... In this case, browsers requested for /
    https://zellwk.com/blog/crud-express-mongodb/... domain name = "zellwk.com"... requested endpoint = "/blog/crud-express-mongodb"


    (B) callback = 
        tells the server what to do when the requested endpoint matches the endpoint stated. 
        It takes two arguments: A request object and a response object.
       
*/
}

function explanation2() {
    // Nodemon restarts the server automatically
        // npm install nodemon --save-dev
            /* --save-dev flag
                    we only use Nodemon when we are developing stuff. 
                    We won’t use Nodemon on an actual server. 
                    --save-dev here adds Nodeman as a devDependency in the package.json file
                    REMEMBER devDependency
            */

            /*
                we didnt install nodemon globally... so, it wont work.. 
                or you can run nodemon from         ./node_modules/.bin/nodemon server.js
                but its long command to type everytime...
                there is a workaround ---> adding  script key in the package.json file.

            */

            /*
                Express doesn’t handle reading data from the <form> element on it’s own. 
                We have to add another package called body-parser to gain this functionality.
                npm install body-parser --save
                    body-parser = is middleware
                    They help to tidy up the request object before we use them.

            */

}

app.get('/', function(req, res) {
  //res.send('Hello World')
  res.sendFile(__dirname + '/index.html');
    // we told Express to serve an index.html file that can be found in the root of your project folder. 
});

app.post('/quotes', (req, res) => {
  console.log('Hellooooooooooooooooo!');
  console.log(req.body);
});


