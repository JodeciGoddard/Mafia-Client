import React from 'react';
import '../css/VideoPlayer.css';

const VideoPlayer = ({ videoRef }) => {



    return (
        <div className="video-container">
            <video ref={videoRef} playsInline autoPlay />
        </div>
    );
}

export default VideoPlayer;