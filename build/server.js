"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = require("socket.io");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get("/", function (req, res) {
    res.status(200).json('Server running');
});
app.post('/active', function (req, res) {
    res.status(200).json({
        msg: "Server actived"
    });
});
//create server with http
var serverHttp = http_1.default.createServer(app);
// config of socker server
var io = new socket_io_1.Server(serverHttp, {
    cors: {
        origin: 'https://superchat-react-ts.netlify.app',
        methods: ["GET", "POST"]
    }
});
// Connection created when user enters page
io.on("connection", function (socket) {
    //console.log(socket.id)
    // Receive an action when the user chooses the room and then creates the room!
    socket.on("join_room", function (roomName) { return socket.join(roomName); });
    socket.on("leave_room", function (roomName) { return socket.leave(roomName); });
    // receiving a message
    socket.on("send_message", function (data) {
        // Send a message back
        socket.to(data.room).emit("receive_message", data);
    });
    // When the user exits
    io.on("disconnect", function (roomName) {
        socket.leave(roomName);
        //console.log(`User Disconnected: ${socket.id}`)
    });
});
serverHttp.listen(process.env.PORT, function () { return console.log("Server running on port: ".concat(process.env.PORT)); });
