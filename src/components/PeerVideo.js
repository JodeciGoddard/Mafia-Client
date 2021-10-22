import React, { useRef, useEffect } from "react";


const PeerVideo = ({ peer }) => {

    const ref = useRef();

    useEffect(() => {

        if (peer) {

            peer.on("stream", stream => {
                ref.current.srcOject = stream;
            })

            console.log("streaming..");

        }

    }, [])

    return (
        <div className="video-container">
            <video ref={ref} playsInline autoPlay />
        </div>
    );
}

export default PeerVideo;