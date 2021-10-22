import React, { useState, useEffect, useRef } from 'react';
import '../css/Game.css';
import Header from '../components/game-components/Header';
import Main from '../components/game-components/Main';
import profilePic from '../images/default.svg';
import { useHistory, useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { roomData, me } from '../State';
import { useRecoilState, useRecoilValue } from 'recoil';

const Game = ({ socket }) => {

    const [events, setEvents] = useState([]);
    const [myStream, setMyStream] = useState(null);

    const [rdata, setRdata] = useRecoilState(roomData);
    const user = useRecoilValue(me);

    let history = useHistory();

    let { roomId } = useParams();

    const userVideo = useRef();

    const role = {
        image: profilePic,
        desc: "See who the Mafia hit is on. Poison once a game. Save once a game.",
        name: "Doctor",
        team: "Civilian",
        //abilities: []
        abilities: [{ name: "Mafia Hit", desc: "See who the mafia hit is on", type: "day" }, { name: "Save", desc: "Save one person", type: "night" }, { name: "Poison", desc: "Kill one person at night", type: "day" }]
    }


    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: { width: 300 }, audio: true })
            .then(stream => {
                setMyStream(stream);
                // let video = myVideoRef.current;
                if (userVideo.current) {
                    userVideo.current.srcObject = stream;
                    userVideo.current.muted = true;
                    userVideo.current.play();
                }
                // video.srcObject = stream;
                // video.muted = true;
                // video.play();
            })
            .catch(err => {
                console.error("error:", err);
            });
    }

    useEffect(() => {
        if (!socket) history.push("/");

        getVideo();

        socket.on('room-update', (room) => {
            setRdata(room);
            console.log("room update: ", room);
        })

        socket.on('allUsers', (users) => {
            //get all the users???
        });

        socket.on('hey', (data) => {

        })


    }, []);

    function callPeer(id) {

    }

    function acceptCall() {

    }

    useEffect(() => {
        if (rdata) {
            console.log("rdata: ", rdata);
            let log = [];
            if (rdata.log) {
                if (rdata.log.length == events.length) {
                    setEvents(rdata.log);
                    return
                }
                for (const msg of rdata.log) {
                    let m = {
                        message: msg
                    };
                    log.push(m);
                }
                setEvents(log);
            }
        }
    }, [rdata])



    const printToConsole = e => {
        const ev = [...events, { message: e }];
        setEvents(ev);
    }

    return (
        <div className="game-container">
            <Header
                role={role}
                events={events}
            />



            <Main
                role={role}
                players={rdata.players}
            >
                <VideoPlayer videoRef={userVideo} />
            </Main>

            <div className="testComp">
                Test comp
            </div>

            <div className="testComp2">
                Test comp
            </div>
        </div>
    );
}

export default Game;