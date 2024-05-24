import { spawn } from 'child_process'
import startLiveStream from './producer.js'
import { io } from './index.js';
class LiveStreaming {

    static async videoLiveStreaming(ytKey,fbKey,twitchKey){
        let isTrue = false;
                    
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
            `rtmp://a.rtmp.youtube.com/live2/${ytKey}`,
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
                if(!isTrue){
                    startLiveStream();
                    isTrue = true
                }

                ffmpegProcess.stdin.write(event, (err) =>{
                    console.log("Errror - ",err);
                })
            })
        })
    }

    static async screenLiveStreaming(ytKey,fbKey,twitchKey){
        try {
            
        } catch (error) {
            console.log(err);
        }
    }
}

export default LiveStreaming