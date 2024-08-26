'use client';
import VideoContainer from "./VideoContainer";
import UserContext from "@/context/UserContext";
import React,{ useCallback, useContext, useEffect } from "react";


const VideoCall = () => {
    const { localStream } = useContext(UserContext);
    const [isVidOn, setIsVidOn] = React.useState(true);
    const [isMicOn, setIsMicOn] = React.useState(true);
    console.log('localStream', localStream);

    useEffect(() => {
        if(localStream){
            const videoTrack = localStream.getVideoTracks()[0];
            const audioTrack = localStream.getAudioTracks()[0];
            setIsVidOn(videoTrack.enabled);
            setIsMicOn(audioTrack.enabled);
        }
    }
    ,[localStream]);

    const toggleCamera = useCallback(() => {
        if(localStream){
            const videoTrack = localStream.getVideoTracks()[0];
            videoTrack.enabled = !videoTrack.enabled;
            setIsVidOn(videoTrack.enabled);
        }
    }
    ,[localStream]);

    const toggleMic = useCallback(() => {
        if(localStream){
            const audioTrack = localStream.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled;
            setIsMicOn(audioTrack.enabled);
        }
    }
    ,[localStream]);


    return (
        <div>
           <div>
           {localStream && (
                <VideoContainer
                    stream={localStream}
                    isLocalStream={true}
                    isOnCall={false}
                />
            )}
           </div>
           <div className="mt-8 mb-8 bg-pink-800 flex items-center">
           <button onClick={toggleCamera}>
                {isVidOn ? "Turn off camera" : "Turn on camera"}
            </button>
            <button onClick={toggleMic}>
                {isMicOn ? "Turn off mic" : "Turn on mic"}
            </button>
            <button>End Call</button> 
        </div>
        </div>
    );

}

export default VideoCall;
