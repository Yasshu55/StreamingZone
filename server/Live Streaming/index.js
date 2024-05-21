import http from 'http'
import express from 'express'
import {Server} from 'socket.io'
import cors from 'cors'
import { spawn } from 'child_process'
import startLiveStream from './producer'

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server,{
    cors: {
      origin: "*",
    },
  });

  const options = [
    '-i',
    '-',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-tune', 'zerolatency',
    '-r', `${25}`,
    '-g', `${25 * 2}`,
    '-keyint_min', 25,
    '-crf', '25',
    '-pix_fmt', 'yuv420p',
    '-sc_threshold', '0',
    '-profile:v', 'main',
    '-level', '3.1',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-ar', 128000 / 4,
    '-f', 'flv',
    `rtmp://a.rtmp.youtube.com/live2/tqh5-vhvx-x6jx-5ye8-65db`,
];

const ffmpegProcess = spawn('ffmpeg',options)

ffmpegProcess.stdout.on('data', (data) => {
    console.log(`ffmpeg stdout: ${data}`);
});

ffmpegProcess.stderr.on('data', (data) => {
    console.error(`ffmpeg stderr: ${data}`);
});

ffmpegProcess.on('close', (code) => {
    console.log(`ffmpeg process exited with code ${code}`);
});


io.on("connection", (socket) =>{
    console.log('Socket Connected',socket.id);

    socket.on("binarystream", event =>{
        console.log("BinaryStream receiving from frontend",event);
        startLiveStream();

        ffmpegProcess.stdin.write(event, (err) =>{
            console.log("Errror - ",err);
        })
    })
})



server.listen(8000, ()=>{
    console.log("HTTP Server running on PORT 8000");
})