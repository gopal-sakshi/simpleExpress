# Cross-site scripting (also known as XSS)
- web security vulnerability
- allows an attacker to compromise the interactions between `user` and `vulnerable application`
- allows an attacker to circumvent the same origin policy
    same origin policy = designed to segregate different websites from each other. 
- allow an attacker 
    to masquerade as a victim user
    to carry out any actions that the user is able to perform
    to access any of the user's data.

3 types of XSS attacks
- reflected XSS
- dom XSS
- stored XSS


`Reflected XSS`
- is the simplest variety of cross-site scripting. 
- It arises when an application receives data in an HTTP request 
    and includes that data within the immediate response in an unsafe way.
- example of a reflected XSS vulnerability:
    https://insecure-website.com/status?message=All+is+well.
    <p>Status: All is well.</p>

The application doesn't perform any other processing of the data, 
so an attacker can easily construct an attack like this:

https://insecure-website.com/status?message=<script>/*+Bad+stuff+here...+*/</script>
<p>Status: <script>/* Bad stuff here... */</script></p>


`Stored XSS`
- application receives <bad data> from an untrusted source
    and includes that data within its later HTTP responses in an unsafe way.
- example how <bad data> enters backend_application
    comments on a blog post
    user nicknames in a chat room
    contact details on a customer order
- this is stored as comments23 in postgres table
    <p>Hello, this is my message!</p>                           <!-- good data -->
    <p><script>/* Bad stuff here... */</script></p>             <!-- bad data --->

    when someone clicks comments on blog post, all these comments added on DOM
    meaning `bad script` is executed

`DOM XSS`
- application contains some client-side JavaScript 
    that processes data from an untrusted source
    and write data back to the DOM.