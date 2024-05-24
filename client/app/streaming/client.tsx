'use client'

import { useEffect, useState,useRef } from "react";
import {io} from 'socket.io-client'
import '../globals.css'
import NavBar from "../components/NavBar";


export default function Streaming() {
    const socket = io('http://localhost:8000/')
    const [media,setMedia] = useState<MediaStream>();
    const [isStart,setIsStart] = useState(false)
    const[isInitialized,setIsInitialized] = useState(false)
    const mediaStream = useRef<MediaStream | null>(null);   
    const overallMediaRecorder = useRef<MediaRecorder | null>(null);
    
    const initializeStreamMedia = async () =>{
      try {
          if(!isInitialized){
          setIsInitialized(true)
          const video = document.getElementById("user-video") as HTMLVideoElement;
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          })
          mediaStream.current = stream
          setMedia(stream)
          video.srcObject = stream;
        }
        const mediaRecorder = new MediaRecorder(media!,{
          audioBitsPerSecond: 128000,
          videoBitsPerSecond: 2500000,
      })

      if(!isStart){
        setIsStart(true)
        mediaRecorder.start(25)
        
        mediaRecorder.ondataavailable = (event) =>{
          console.log("Entered MediaRecorder");
          
          if (typeof event.data === "undefined") return;
          if (event.data.size === 0) return;
          
          console.log("Binary Stream available : ",event.data)
          socket.emit("binarystream",event.data)
        }
        overallMediaRecorder.current = mediaRecorder;
      } else {
        console.log("Stopped the stream!");
        if(overallMediaRecorder.current){
          overallMediaRecorder.current.ondataavailable = null
          overallMediaRecorder.current.stop()
        }
        // mediaStream.current = null;
        overallMediaRecorder.current = null;
        setIsStart(false);
        alert("Stopped the streamed! Congrats for streaming successfully!")
      }
        } catch (error) {
          console.error("Error accessing media devices:", error);
        }
      }

    useEffect(() =>{        
      initializeStreamMedia();
    },[])
    

  const handleStart = async () =>{
    try {
      initializeStreamMedia()
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
              <button className='bg-[#f0a417] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black' onClick={handleStart}>
                Stop
                </button>
            }
          </div>
        </div>
      </main>
    </div>
  );
}
