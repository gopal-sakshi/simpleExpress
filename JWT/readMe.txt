- we will be using this module for JWT authentication
- jsonwebtoken
    this is the module/package
- Its installed in package.json in "NodeJS microservices lib"
    its package.json name is '@kalgudi/lib'

A JSON Web Token consists of 3 parts separated by a period.
- JWT Header
    Algorithms can be HMAC, SHA256, RSA, HS256 or RS256.
- Payload
    consists of the session data called as claims.
- Signature
    most important part of a JSON Web Token(JWT)
    calculated by encoding the header and payload using Base64url Encoding


Session Tokens
- encrypted unique strings that are used to identify Session Instances.

https://siddharthac6.medium.com/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e


In order to create a JSON web token, we will need — three things
- Payload
- Secret (Private key)
    we need to create aprivate-public key pair.
    http://travistidwell.com/jsencrypt/demo/
- Signing options

