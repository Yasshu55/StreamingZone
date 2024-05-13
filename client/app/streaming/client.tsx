'use client'

import { useEffect, useState } from "react";
import {io} from 'socket.io-client'

export default function Streaming() {
    const socket = io('http://localhost:8000/')
    const [media,setMedia] = useState<MediaStream>();
    
    useEffect(() =>{
      
      const initializeStreamMedia = async () =>{
        try {
          const video = document.getElementById("user-video") as HTMLVideoElement;
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          })
          setMedia(stream)
          video.srcObject = stream;
        } catch (error) {
          console.error("Error accessing media devices:", error);
        }
      }
    
      initializeStreamMedia();
    },[])
    

  const handleStart = async () =>{
    try {
        const mediaRecorder = new MediaRecorder(media!,{
            audioBitsPerSecond: 128000,
            videoBitsPerSecond: 2500000,
        })
        mediaRecorder.start(25)

        mediaRecorder.ondataavailable = (event) =>{
            console.log("Entered MediaRecorder");
            
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;

            console.log("Binary Stream available : ",event.data)
            socket.emit("binarystream",event.data)
        }

    } catch (error) {
        console.log(error);
    }
  }
  
  return (
    <div >
        <h1>Streamyard clone</h1>
        <video id="user-video" autoPlay muted></video>
        <button onClick={handleStart}>Start</button>
    </div>
  );
}
