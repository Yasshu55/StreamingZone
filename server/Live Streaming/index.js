import http from 'http'
import express from 'express'
import {Server} from 'socket.io'
import cors from 'cors'
import { Router } from 'express'
import AuthRoutes from './routes/authRoutes.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
export const io = new Server(server,{
    cors: {
      origin: "*",
    },
  });

  app.use("/api",AuthRoutes)

server.listen(8000, ()=>{
    console.log("HTTP Server running on PORT 8000");
})
