import express from 'express'
import {dirname, join} from 'path'
import url from 'url'
import {Server} from 'socket.io'
import {createServer} from 'http'


const app = express()
const __dirname = dirname(url.fileURLToPath(import.meta.url))
const server = createServer(app)

const io = new Server(server)



server.listen(5000, () => {
    console.log('running on http://localhost:5000');
})

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'))
})

io.on('connection', (socket) => {
    socket.on('chat', (msg) => {
        io.emit('chat', msg)
    })
})