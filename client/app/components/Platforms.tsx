import React, { useState,ChangeEvent } from 'react'
import { FaYoutube  } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa";
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

export default function Platforms() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const[ytKey,setYtKey] = useState("");
    const[fbKey,setfbKey] = useState("");
    const[twitchKey,setTwitchKey] = useState("");

    const ytHandler = (e: any) => {
        try {
            const newValue = e.target.value;
            setYtKey(newValue);
            console.log(ytKey);
        } catch (error) {
            console.log(error);
        }
    };

    const fbHandler = (e : any) => {
        try {
            const newValue = e.target.value;
            setfbKey(newValue);
            console.log(fbKey);
        } catch (error) {
            console.log(error);
        }
    }

    const twitchHandler = (e : any)  => {
        try {
            const newValue = e.target.value;
            setTwitchKey(newValue);
            console.log(twitchKey);
        } catch (error) {
            console.log(error);
        }
    }

    const goToStreamingPage = (typeOfStream : string) => {
        const url = new URL('/streaming', window.location.href);
        url.searchParams.append('type', typeOfStream);
    
        router.push(url.toString());
      };

    const submitHandler = async (e : any) =>{
        try {
            e.preventDefault();
            const typeOfStream = searchParams.get("type");

            if(ytKey === "" && fbKey === "" && twitchKey === ""){
                alert("Enter atleast any 1 stream key!")
                return
            }
            
            if(typeOfStream === "video"){ 

                const res = await fetch('https://streamingzone.onrender.com/api/live/videoStreaming',{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        ytKey: ytKey, 
                        fbKey: fbKey,
                        twitchKey: twitchKey,
                        type:typeOfStream
                    })
                })

                if(!res.ok){
                    throw new Error('Something went wrong')
                }
                const data = await res.json();
                console.log(data);

                // router.push({
                //     pathname: '/streaming',
                //     query: {
                //         type: typeOfStream
                //     }
                // } as any)
                goToStreamingPage(typeOfStream)

            } else if(typeOfStream === "screen") {

                const res = await fetch('https://streamingzone.onrender.com/api/live/screenStreaming',{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        ytKey: ytKey, 
                        fbKey: fbKey,
                         twitchKey: twitchKey,
                         type:typeOfStream
                    })
                })

                if(!res.ok){
                    throw new Error('Something went wrong')
                }
                const data = await res.json();
                console.log(data);

                // router.push({
                //     pathname: '/streaming',
                //     query: {
                //         type: typeOfStream
                //     }
                // } as any)

                goToStreamingPage(typeOfStream)
            } else {
                alert("Unknown error! Select a proper streaming type to continue")
                router.push('/home')
            }
            
            
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div className='text-white bg-white'>
        <div className='max-w-[1300px] mt-[-100px] w-full h-screen mx-auto text-center flex flex-col justify-center'>            
            <div>
                 <h1 className='w-full text-3xl font-bold text-[#000000]'>Select platforms to stream on</h1>
            </div>
            <br />
            <form className='mt-[70px] text-black' action="" method="post">
                <div className='flex justify-center'>
                <FaYoutube size={60} className='pr-9' />
                    <input type="text" placeholder='Enter Stream Key' onChange={ytHandler}/>
                    <br />
                    <br />
                </div>
                <div className='flex justify-center'>
                <FaFacebook size={60} className='pr-9'/>
                    <input type="text" placeholder='Enter Stream Key'onChange={fbHandler}/>
                    <br />
                    <br />
                </div>
                <div className='flex justify-center'>
                <FaTwitch size={60} className='pr-9'/>
                    <input type="text" placeholder='Enter Stream Key' onChange={twitchHandler}/>
                    <br />
                    <br />
                </div>

                    <button className='bg-[#27ffbb] w-[120px] rounded-md font-medium my-3 mx-auto py-2 text-black' type='submit' onClick={submitHandler}>
                        Submit
                    </button>
            </form>
        </div>
    </div>
  )
}
