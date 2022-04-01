# send() 
- forwards any data passed as an argument to the client-side. 
- The method can take a string, array, object as an argument.
- this method defines its own built-in headers natively, depending on the Content-Type & Content-Length of the data.
    

# status() 
- specify HTTP status codes
- you can chain the send() method & status() method
- sendStatus() method is a shorthand syntax to adapt the functionality of both the .status() and .send() methods:

# append()
- to define a header in your server response
    
# redirect()
- direct the client side to a different page

# render()
- accepts an HTML file as 1st argument and sends it to the client-side. 
- optional second argument, a locals object, with custom properties 

# end()
- terminate the response cycle

# sendFile()
- to send HTML, CSS, JavaScript files to the client side 

# download() 
- sends & prompts the client-side to download a file 
- also, sets appropriate headers for the file type 

# type() 
- to outline the value of a Content-Header on a file type

res.send('Hello World!'))
res.status(404).send('Not Found');
res.sendStatus(404);

res.append('Content-Type', 'application/javascript; charset=UTF-8');
res.append('Connection', 'keep-alive')
res.append('Set-Cookie', 'divehours=fornightly')
res.append('Content-Length', '5089990');

res.redirect('/sharks/shark-facts')
res.render('shark.html', {status: 'good'});
res.sendFile(req.params.fileName, options, function (err) {...})
res.download(file);

res.type('png')              // => 'image/png'
res.type('html')             // => 'text/html'
res.type('application/json') // =>'application/json'