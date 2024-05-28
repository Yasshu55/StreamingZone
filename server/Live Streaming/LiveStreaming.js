import { spawn } from 'child_process';
import startLiveStream from './producer.js';
import { io } from './index.js';

class LiveStreaming {
    static async videoLiveStreaming(ytKey, fbKey, twitchKey) {
        let isTrue = false;

        const ytOptions = [
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
            '-f', 'flv', `rtmp://a.rtmp.youtube.com/live2/${ytKey}`
        ];

        const fbOptions = [
            '-i', '-',
            '-c:v', 'libx264',
            '-preset', 'ultrafast',
            '-tune', 'zerolatency',
            '-r', '25',
            '-g', '50',
            '-keyint_min', '25',
            '-crf', '25',
            '-pix_fmt', 'yuv420p',
            '-f', 'flv', `rtmps://live-api-s.facebook.com:443/rtmp/${fbKey}`
        ];

        const twitchOptions = [
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
            '-f', 'flv', `rtmp://live.twitch.tv/app/${twitchKey}`
        ];

        function startFfmpegProcess(options, platform) {
            let ffmpegProcess = spawn('ffmpeg', options);

            ffmpegProcess.stdout.on('data', (data) => {
                console.log(`${platform} ffmpeg stdout: ${data}`);
            });

            ffmpegProcess.stderr.on('data', (data) => {
                console.error(`${platform} ffmpeg stderr: ${data}`);
            });

            ffmpegProcess.on('close', (code) => {
                console.log(`${platform} ffmpeg process exited with code ${code}`);
                ffmpegProcess = null;
            });

            ffmpegProcess.on('error', (err) => {
                console.error(`${platform} ffmpeg process error:`, err);
            });

            ffmpegProcess.on('exit', (code, signal) => {
                console.log(`${platform} ffmpeg process exited with code ${code} and signal ${signal}`);
                ffmpegProcess = null;
            });

            return ffmpegProcess;
        }

        const ytProcess = startFfmpegProcess(ytOptions, 'YouTube');
        const fbProcess = startFfmpegProcess(fbOptions, 'Facebook');
        const twitchProcess = startFfmpegProcess(twitchOptions, 'Twitch');

        io.on("connection", (socket) => {
            console.log('Socket Connected', socket.id);
            console.log("YouTube key:", ytKey);
            console.log("Facebook key:", fbKey);
            console.log("Twitch key:", twitchKey);

            socket.on("binarystream", (event) => {
                console.log("BinaryStream receiving from frontend", event);
                if (!isTrue) {
                    startLiveStream();
                    isTrue = true;
                }
                
                const writeStream = (process, event) => {
                    if (process && process.stdin.writable && process.killed === false) {
                        process.stdin.write(event, (err) => {
                            if (err) {
                                console.error('Error writing to ffmpeg stdin:', err);
                            }
                        });
                    } else {
                        console.error('Cannot write to ffmpeg process stdin: process is not writable');
                    }
                };

                if (ytKey !== "") {
                    writeStream(ytProcess, event);
                }

                if (fbKey !== "") {
                    writeStream(fbProcess, event);
                }

                if (twitchKey !== "") {
                    writeStream(twitchProcess, event);
                }
            });

            socket.on('disconnect', () => {
                console.log('Socket disconnected', socket.id);
            
                const closeProcess = (process) => {
                    if (process && process.killed === false) {
                        process.stdin.end();
                        process.kill('SIGINT');
                    }
                };
            
                closeProcess(ytProcess);
                closeProcess(fbProcess);
            });
        });
    }

    static async screenLiveStreaming(ytKey, fbKey, twitchKey) {
        let isTrue = false;

        const ytOptions = [
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
            '-f', 'flv', `rtmp://a.rtmp.youtube.com/live2/${ytKey}`
        ];

        const fbOptions = [
            '-i', '-',
            '-c:v', 'libx264',
            '-preset', 'ultrafast',
            '-tune', 'zerolatency',
            '-r', '25',
            '-g', '50',
            '-keyint_min', '25',
            '-crf', '25',
            '-pix_fmt', 'yuv420p',
            '-f', 'flv', `rtmp://live-api-s.facebook.com:443/rtmp/${fbKey}`
        ];

        const twitchOptions = [
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
            '-f', 'flv', `rtmp://live.twitch.tv/app/${twitchKey}`
        ];

        function startFfmpegProcess(options, platform) {
            let ffmpegProcess = spawn('ffmpeg', options);

            ffmpegProcess.stdout.on('data', (data) => {
                console.log(`${platform} ffmpeg stdout: ${data}`);
            });

            ffmpegProcess.stderr.on('data', (data) => {
                console.error(`${platform} ffmpeg stderr: ${data}`);
            });

            ffmpegProcess.on('close', (code) => {
                console.log(`${platform} ffmpeg process exited with code ${code}`);
                ffmpegProcess = null;
            });

            ffmpegProcess.on('error', (err) => {
                console.error(`${platform} ffmpeg process error:`, err);
            });

            ffmpegProcess.on('exit', (code, signal) => {
                console.log(`${platform} ffmpeg process exited with code ${code} and signal ${signal}`);
                ffmpegProcess = null;
            });

            return ffmpegProcess;
        }

        const ytProcess = startFfmpegProcess(ytOptions, 'YouTube');
        const fbProcess = startFfmpegProcess(fbOptions, 'Facebook');
        const twitchProcess = startFfmpegProcess(twitchOptions, 'Twitch');

        io.on("connection", (socket) => {
            console.log('Socket Connected', socket.id);
            console.log("YouTube key:", ytKey);
            console.log("Facebook key:", fbKey);
            console.log("Twitch key:", twitchKey);

            socket.on("binarystream", (event) => {
                console.log("BinaryStream receiving from frontend", event);
                if (!isTrue) {
                    startLiveStream();
                    isTrue = true;
                }
                
                const writeStream = (process, event) => {
                    if (process && process.stdin.writable && process.killed === false) {
                        process.stdin.write(event, (err) => {
                            if (err) {
                                console.error('Error writing to ffmpeg stdin:', err);
                            }
                        });
                    } else {
                        console.error('Cannot write to ffmpeg process stdin: process is not writable');
                    }
                };

                if (ytKey !== "") {
                    writeStream(ytProcess, event);
                }

                if (fbKey !== "") {
                    writeStream(fbProcess, event);
                }

                if (twitchKey !== "") {
                    writeStream(twitchProcess, event);
                }
            });

            socket.on('disconnect', () => {
                console.log('Socket disconnected', socket.id);
            
                const closeProcess = (process) => {
                    if (process && process.killed === false) {
                        process.stdin.end();
                        process.kill('SIGINT');
                    }
                };
            
                closeProcess(ytProcess);
                closeProcess(fbProcess);
            });
        });
    }
}

export default LiveStreaming;
