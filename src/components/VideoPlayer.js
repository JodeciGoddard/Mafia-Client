import React, { useRef, useEffect, useState } from 'react';
import '../css/VideoPlayer.css';

const VideoPlayer = ({ myVideo, getMyVideo }) => {

    const myVideoRef = useRef(null);
    const [stream, setStream] = useState(null);

    useEffect(() => {

        getMyVideo(myVideoRef);

    }, [myVideoRef]);


    return (
        <div className="video-container">
            <video ref={myVideoRef} playsInline autoPlay />
        </div>
    );
}

export default VideoPlayer;