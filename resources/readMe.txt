/*
    urlencoded method within body-parser tells body-parser to extract data from the <form> element 
    AND add them to the body property in the request object.
*/

// https://zellwk.com/blog/crud-express-mongodb/

---------------------------------------------------------------------------------------------------------------------------------
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
---------------------------------------------------------------------------------------------------------------------------------       

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
---------------------------------------------------------------------------------------------------------------------------------

nodeJs streams

https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93/



While an HTTP response is a readable stream on the client, it’s a writable stream on the server. 
- This is because in the HTTP case, we basically read from one object (http.IncomingMessage) and write to the other (http.ServerResponse)

