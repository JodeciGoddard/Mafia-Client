import React, { useRef, useEffect } from "react";


const PeerVideo = ({ peer }) => {

    const ref = useRef();

    useEffect(() => {

        if (peer) {

            peer.on("stream", stream => {


                if (ref.current) {
                    ref.current.srcObject = stream;
                    ref.current.muted = false;
                    ref.current.play();
                }

                console.log("ref: ", ref);
                console.log("streaming..", peer);
            })

        }

    }, [])

    return (
        <div className="video-container">
            {ref ? <video ref={ref} playsInline autoPlay /> : 'no video'}
        </div>
    );
}

export default PeerVideo;