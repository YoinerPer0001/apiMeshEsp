import express from 'express'
import db from './core/db.js'
import lecturasRoutes from './routes/lecturaRoutes.js'
import cors from 'cors'
import axios from 'axios';
import { createServer } from "http";
import { Server } from "socket.io";
import { onDisconnect } from './sockets/socket.js';
import MaquinasRoutes from './routes/maquinasRoutes.js';
import cron from 'node-cron'


cron.schedule('*/5 * * * *', async () => {
    try {
      console.log('Despertando Api...');
  
      const response = await axios.get('https://apipredictionmachines.onrender.com');
  
      console.log('Respuesta de la API:', response.data);
    } catch (error) {
      console.error('Error al llamar a la API:', error.message);
    }
});

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
    // options
});


app.use(express.json());

const initialPath = "/api"
app.use(initialPath, lecturasRoutes)
app.use(initialPath, MaquinasRoutes)

io.on("connection", async (socket) => {
    console.log("user connected")

    onDisconnect(io, socket)
    // onNewData(io, socket)
});

app.use(cors())


httpServer.listen(3000, '0.0.0.0', () => {
    console.log("app success port: 3000")
})

export default io