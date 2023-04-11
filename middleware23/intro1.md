`Types of middleware in Express`
    Application-level Middleware
    Router-level Middleware
    Error-handling Middleware
    Built-in Middleware
    Third-party Middleware
-----------------------------------------------------------------------------------------

`Application-level middleware`
- used to bind to the app object using <app.use()> method. 
- It applies on all routes.
- application vs route level middleware
    application level middleware            runs for all routes in an <app object>
    route level middleware                  runs for all routes in a <router object>
-----------------------------------------------------------------------------------------

`Router-level Middleware`
- used to bind to a specific instance of express.Router()
-----------------------------------------------------------------------------------------

`Built-in Middleware`
- introduced with version 4.x. 
- It ends the dependency on Connect.
- some built-in middleware functions in Express.js
    static                  used to serve static assets such as HTML files, images
    json                    used to parse the incoming requests with JSON payloads
    urlencoded              used to parse the incoming requests with URL-encoded payloads
-----------------------------------------------------------------------------------------

`Third-party Middleware`
    Body-parser
    Cookie-parser
    Mongoose
    Sequelize
    Cors
    Express-validator
-----------------------------------------------------------------------------------------

