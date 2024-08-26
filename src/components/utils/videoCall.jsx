'use client';
import VideoContainer from "./VideoContainer";
import UserContext from "@/context/UserContext";
import React, { useCallback, useContext, useEffect } from "react";

const VideoCall = () => {
    const { localStream, handleHangup, peer } = useContext(UserContext);
    const [isVidOn, setIsVidOn] = React.useState(true);
    const [isMicOn, setIsMicOn] = React.useState(true);
    
    // Update state when localStream is set
    useEffect(() => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            const audioTrack = localStream.getAudioTracks()[0];
            setIsVidOn(videoTrack?.enabled ?? false);
            setIsMicOn(audioTrack?.enabled ?? false);
        }
    }, [localStream]);

    // Toggle Camera On/Off
    const toggleCamera = useCallback(() => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsVidOn(videoTrack.enabled);
            }
        }
    }, [localStream]);

    // Toggle Microphone On/Off
    const toggleMic = useCallback(() => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsMicOn(audioTrack.enabled);
            }
        }
    }, [localStream]);

    // Attach Local Stream to Video Element
    useEffect(() => {
        const localVideoElement = document.getElementById('localVideo');
        if (localStream && localVideoElement) {
            localVideoElement.srcObject = localStream;
            localVideoElement.play();
        }
    }, [localStream]);

    // Attach Remote Stream to Video Element
    useEffect(() => {
        const remoteVideoElement = document.getElementById('remoteVideo');
        if (peer?.stream && remoteVideoElement) {
            console.log("Attaching remote stream to video element.");
            remoteVideoElement.srcObject = peer.stream;
            remoteVideoElement.play();
        }
    }, [peer?.stream]);

    return (
        <div className="relative flex flex-col bg-slate-100 gap-9 min-h-screen items-center">
            <div className="flex gap-2 max-w-screen">
                {/* Display local stream */}
                <div className="w-1/2">
                {localStream && (
                    <VideoContainer
                        stream={localStream}
                        isLocalStream={true}
                        isOnCall={true}
                    />
                )}
                </div>
                {/* Display remote stream */}
                <div className="w-1/2">
                {peer?.stream && (
                    <VideoContainer
                        stream={peer.stream}
                        isLocalStream={false}
                        isOnCall={true}
                    />
                )}
                </div>
            </div>
            {/* Control buttons */}
            {localStream && (
                <div className="mt-8 flex items-center space-x-8 bg-slate-100 p-4 rounded-lg bottom-10">
                    <button 
                        onClick={toggleCamera}
                        className={`px-4 py-2 rounded-full text-white transition-colors duration-300 ${
                            isVidOn ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                        }`}
                    >
                        {isVidOn ? "Turn off camera" : "Turn on camera"}
                    </button>
                    <button 
                        onClick={toggleMic}
                        className={`px-4 py-2 rounded-full text-white transition-colors duration-300 ${
                            isMicOn ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                        }`}
                    >
                        {isMicOn ? "Turn off mic" : "Turn on mic"}
                    </button>
                    <button 
                        onClick={handleHangup}
                        className="px-4 py-2 rounded-full bg-red-700 text-white hover:bg-red-800 transition-colors duration-300"
                    >
                        End Call
                    </button>
                </div>
            )}
        </div>
    );
}

export default VideoCall;
