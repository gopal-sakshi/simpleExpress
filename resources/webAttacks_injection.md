# Injection
- attacker can send hostile data to an interpreter.

query = "SELECT * FROM accounts WHERE custID='" + request.getParameter("id") + "'";
id = 23, 44
query = SELECT * FROM accounts WHERE custID = 23;
query = SELECT * FROM accounts WHERE custID = 44;


But attacker modifies id parameter as <!--     ' or '1'='1       -->
    // http://example.com/app/accountView?id=' or '1'='1
now the query becomes
SELECT * FROM accounts WHERE custID = 'the_thing_in_green'
    // now this query becomes ===> SELECT * FROM accounts WHERE custID = '' or '1'='1'
    // this query ===> return all the records from the accounts table
    

- Injection flaws are very prevalent, particularly in legacy code
- Injection flaws are easy to discover when examining code


An application is vulnerable to attack
- User-supplied data is 
    not validated, filtered, sanitized by the application.
- Dynamic queries (or) non-parameterized calls without context-aware escaping are used directly in the interpreter.
- Hostile data is used within object-relational mapping (ORM) search parameters 
    to extract additional, sensitive records.
- Hostile data is directly used or concatenated, 
    such that the SQL or command contains both structure and hostile data in dynamic queries, commands, or stored procedures.
----------------------------------------------------------------------------------------------------