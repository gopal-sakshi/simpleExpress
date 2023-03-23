Cookies
- track user-interaction
- sessionIds

Cookies contain session tokens for web applications 
- to ensure that user sessions are maintained between browser page refreshes.
- contents of a shopping basket need to be maintained between page refreshes
--------------------------------------------------------------------------------

# cookie declaration
`Set-Cookie: session=219ffwef9w0f; Path=/; Secure; HttpOnly`

`Secure flag`
- web browser will transmit the cookie over network connections 
    that are encrypted using the SSL or TLS protocols.
- prevents the cookie from being obtained in plaintext by an attacker
    who is able to intercept the network traffic between browser & server

`HttpOnly flag`
- cookie will only be transmitted through HTTP requests made by the browser
- will not be accessible to client-side scripts (JavaScript)

`Cookie Domain`
- <domain=.myapp.com> will be valid for all subdomains of the myapp
- 

`Cookie Path`
- determines the URL path for which the cookie will be valid
- "path=/", the cookie will be valid for all application paths


`expires=Wed, 31-Jul-2019 07:00:00 GMT`
- after exprity time, the cookie will no longer be considered valid
- If no expiry has been configured for a cookie
    the cookie will be deleted when the browser application has been closed.
- For cookies that contain <session tokens>
    cookie shouldnt have an expiry date
    If a malicious user is able to access the workstation of a valid user, 
    they will be able to obtain the cookies from the browser cache if the cookies have not yet expired. 
    means, attacker could steal the session token of the legitimate user & then use them to access the application.

--------------------------------------------------------------------------------