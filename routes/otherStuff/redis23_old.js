var redis = require('redis');
var fs = require('fs');

const express = require('express');
const redisRouter = express.Router();

async function redisServer23(server23) {
    // { path: 'redis12/socket.io'}
    var io = require('socket.io')(server23, { 
        cors: { 
            origin: '*',
            methods: ["GET", "POST"]            
        },
        path: '/socket23' });
    console.log("started socket server23");
    console.log("engine info ===> ", io.engine.clientsCount);
    var redis2 = require('@socket.io/redis-adapter');
    const redisUrl23 = `redis://localhost:6379`
    var pubClient = redis.createClient({ url: redisUrl23 });
    var subClient = pubClient.duplicate();
    await pubClient.connect();
    await subClient.connect();
    io.adapter(redis2(pubClient, subClient));

    subClient.on("message", function (channel, data) { 
        data = JSON.parse(data);
        if(data.sendType == 'sendToSelf') {
            io.emit(data.method, data.data);
        } else if(data.sendType == 'sendToAllConnectedClients') {
            io.sockets.emit(data.method, data.data);
        } else if(data.sendType == 'sendToAllClientsInRoom') {
            io.sockets.in(channel).emit(data.method, data.data);
        }
    });

    io.sockets.on('connection', function (socket) { 
        console.log("some one asking for connection23");
        
        subClient.on('subscribe', (channel, count) => {
            console.log(`subscribed23 to ${channel}, total count ==> ${count}`);
        });

        socket.on("setUserName23", (data) => {
            console.log("setusername23 ==> ", data);
        });

        socket.on("createRoom", (data) => {
            // console.log("createroom23 ", data)
            // subClient.subscribe(data.room);
            // socket.join(data.room);
            // pubClient.publish(data.room, new Date().toISOString());
        });

        socket.on("joinRoom", (data) => {
            console.log("joinRooom23 from client , " + JSON.stringify(data));
            // subClient.subscribe(data.room);
            socket.join(data.room); 

            // welcome message to user
            socket.emit('message', { userName: 'user23', text: 'wlcom23', time: new Date().toISOString() });
            
            // broadcast that user joined
            socket.broadcast.to(data.room).emit('message', { text: 'evado join ayyadu', time: new Date().toISOString() });

            // //send users and room info
            // io.to(user.room).emit('roomUsers', {
            //     room: user.room,
            //     users: getRoomUsers(user.room),
            //   });
        });

        socket.on("sendMessage23", (data) => {
            console.log("send message23 ", JSON.stringify(data));
            var reply = JSON.stringify({
                method: 'message',
                sendType: 'sendToAllClientsInRoom',
                data: data.user + '__' + data.msg
            })
            pubClient.publish(data.room, reply)
        });

        // DONT USE DISCONNECT... node is crashing with this error == ClientClosedError: The client is closed
        // socket.on("disconnect", () => {
        //     console.log("disconnect called is it crashing here ??")
        //     subClient.quit();
        //     pubClient.publish("chatting","User is disconnected :" + socket.id);
        // });
    });

    // testIOConnection
    const socketClient23 = require('socket.io-client')("http://localhost:3044", { path: '/socket23', transports: ['websocket'] });
    socketClient23.on('connect_error', (err) => {
        console.log("connect 23 error ===> ", err);
    });
    socketClient23.on("connect", () => {
        console.log("socketid 23 ====> ", socketClient23.id); // x8WIv7-mJelg7on_ALbx
    });
}


redisRouter.get('/html23', (req, res) => {
    fs.readFile('resources/redis23_socketio.html', function(err,data){
        if(err){
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
});
})

module.exports = {
    redisServer23,
    redisRouter
}