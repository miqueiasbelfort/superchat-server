import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

const app = express()

// interfaces
type Data = {
    room: string,
    author: string,
    message: string,
    time: string
}

app.use(cors())

app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).json('Server running')
})

//create server with http
const serverHttp = http.createServer(app)

// config of socker server
const io = new Server(serverHttp, {
    cors: {
        origin: 'https://superchat-react-ts.netlify.app',
        methods: ["GET", "POST"]
    }
})

// Connection created when user enters page
io.on("connection", socket => {

    //console.log(socket.id)

    // Receive an action when the user chooses the room and then creates the room!
    socket.on("join_room", (roomName: string) => socket.join(roomName))
    socket.on("leave_room", roomName => socket.leave(roomName))

    // receiving a message
    socket.on("send_message", (data: Data) => {

        // Send a message back
        socket.to(data.room).emit("receive_message", data)

    })

    // When the user exits
    io.on("disconnect", (roomName) => {
        socket.leave(roomName)
        //console.log(`User Disconnected: ${socket.id}`)
    })
})

serverHttp.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`))