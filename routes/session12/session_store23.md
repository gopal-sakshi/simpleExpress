`session storing techniques`
- Memory (single-server, non-replicated persistent storage)
    all session information is stored in memory
    it is lost when you stop & restart
- File system persistence
- JDBC persistence
- Cookie-based session persistence
- In-memory replication

---------------------------------------------------------------------------------

express-session middleware
- to manage sessions in Nodejs. 
- The session is stored in the express server itself. 

The default server-side session storage, MemoryStore
- is purposely not designed for a production environment. 
    it will leak memory under most conditions
    does not scale past a single process
    is meant for debugging and developing. 
    
To manage multiple sessions for multiple users 
    we have to create a global map and put each session object to it. 
But, Global variables in NodeJs are memory consuming 
    can be terrible security holes in production level projects.

-------------------------------------------------------------------------------

This can be solved by using external Session Store. We have to store every session in the store so that each one will belong to only a single user. One popular session store is built using the Redis.