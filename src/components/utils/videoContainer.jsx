import { useEffect, useRef } from "react";

const VideoContainer = ({ stream, isLocalStream, isOnCall }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <video
            className="rounded border w-[800px]"
            ref={videoRef}
            autoPlay
            playsInline
            muted={isLocalStream}
        />
    );
}

export default VideoContainer;
