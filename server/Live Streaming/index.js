import http from 'http'
import express from 'express'
import {Server} from 'socket.io'
import cors from 'cors'
import AuthRoutes from './routes/authRoutes.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8000;


const server = http.createServer(app);
export const io = new Server(server,{
    cors: {
      origin: "*",
    },
  });

  app.use("/",AuthRoutes)

server.listen(PORT, ()=>{
    console.log(`HTTP Server running on port ${PORT}`);
})
