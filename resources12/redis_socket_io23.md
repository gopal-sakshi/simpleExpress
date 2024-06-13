https://socket.io/docs/v3/rooms/index.html


io
- server instance

socket
- each connected client ===>
- if io object has 3 connected clients ===> it means `3 socket objects` created in <io object>
- each socket is identified by unique identifier <socket.id>
- each socket automatically joins a room identified by its own id


socket.broadcast.to(room23).emit()  ===> emits data to all clients in the room except the one that originally emitted event
io.to(room23).emit()        =====> emits data to all clients including the one that originally emitted the event
