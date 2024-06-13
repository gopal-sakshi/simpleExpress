var redis = require('redis');
var fs = require('fs');

const express = require('express');
const redisRouter = express.Router();

async function redisServer23(server23) {
    var io = require('socket.io')(server23, { 
        cors: { origin: '*', methods: ["GET", "POST"] },
        path: '/socket23' 
    });

    var redis2 = require('@socket.io/redis-adapter');
    const redisUrl23 = `redis://localhost:6379`
    var pubClient = redis.createClient({ url: redisUrl23 });
    var subClient = pubClient.duplicate();
    await pubClient.connect();
    await subClient.connect();
    io.adapter(redis2(pubClient, subClient));
    
    const users23 = [];

    io.on('connection', (socket) => {
        console.log(`evado client connect ayyaadu ===> `, socket.id);
        // console.log("connected clients ===> ", io.sockets.sockets.clients());
        console.log("clients in football12 room ====> ", io.sockets.adapter.rooms.get('football12'))
        socket.on('joinRoom', ({ userName, room }) => {
            console.log(`client gaadu joinRoom msg emit chesaadu `, userName, room);
            users23.push({id: socket.id, userName, room});
    
            socket.join(room);
    
            //Welcome current user
            socket.emit('message', { time: Date.now(), msg: 'welcome user23'});
    
            //broadcase when a user connects
            socket.broadcast.to(room).emit('message', { time: Date.now(), msg: 'evado join ayyadu' });
        });
    
        //Listen for chatMessage
        socket.on('chatMessage', (msgObj) => {
            console.log("client gaadu chatMessage event emit chesaadu ", JSON.stringify(msgObj))
            const user = users23.find((user) => socket.id === user.id);
            console.log(`Chat Message23 ====>: ${msgObj.msg} from ${user.userName}`);
            io.to(user.room).emit('message', { time: Date.now(), msg: msgObj.msg });
        });
    
        // socket.on('disconnect', () => {
        //     const user = userLeave(socket.id);
        //     if (user) {
        //         io.to(user.room).emit(
        //             'message',
        //             formatMessage(BOT_NAME, `${user.username} has left the chat`, PORT)
        //         );
    
        //         //send users and room info
        //         io.to(user.room).emit('roomUsers', {
        //             room: user.room,
        //             users: getRoomUsers(user.room),
        //         });
        //     }
        // });
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