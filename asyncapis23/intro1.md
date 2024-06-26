AsyncAPI

client makes a call to API/service
it doesnt wait for the response
but registers a callback (endpoint address) to API/Service
API/service sends the response later

technically, client is also a server here
- this solution can be used only in server-to-server exchanges;