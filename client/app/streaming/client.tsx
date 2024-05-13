'use client'

import { useEffect, useState } from "react";
import {io} from 'socket.io-client'
import '../globals.css'
import NavBar from "../components/NavBar";


export default function Streaming() {
    const socket = io('http://localhost:8000/')
    const [media,setMedia] = useState<MediaStream>();
    const [isStart,setIsStart] = useState(false)
    
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

    const handleStop = async () =>{
      try {
        // console.log("False");
        setIsStart(false)
      } catch (error) {
        console.log(error);
      }
    }
    

  const handleStart = async () =>{
    try {
      // console.log("True");
      
      setIsStart(true)
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
      <header>
        <NavBar />
      </header>
      <main>
        <div className='text-white '>
        <div className='max-w-[500px] mt-[-100px] w-full h-screen mx-auto text-center flex flex-col justify-center pt-20'>
          <h2>Accept the Camera/Screen share Permissions</h2>
            <video id="user-video" autoPlay muted></video>
            { !isStart &&
              <button className='bg-[#f0a417] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black' onClick={handleStart}>
                Start
                </button>
            }

            { isStart &&
              <button className='bg-[#f0a417] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black' onClick={handleStop}>
                Stop
                </button>
            }
          </div>
        </div>
      </main>
    </div>
  );
}
