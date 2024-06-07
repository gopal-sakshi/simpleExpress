const express = require('express');
const app = express();
var http = require('http');

var server = http.createServer(app);
server.listen(30444);

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


const ioClient = require("socket.io-client");
const socket = ioClient("http://localhost:30444", {
});

socket.on("connect", () => {
    console.log("socketid 23 ====> ", socket.id); // x8WIv7-mJelg7on_ALbx
});