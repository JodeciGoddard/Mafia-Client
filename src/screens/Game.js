import React, { useState, useEffect } from 'react';
import '../css/Game.css';
import Header from '../components/game-components/Header';
import Main from '../components/game-components/Main';
import profilePic from '../images/default.svg';
import { useHistory } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';

const Game = ({ socket }) => {

    const [events, setEvents] = useState([{ message: "empty log" }]);
    const [myStream, setMyStream] = useState(null);
    let history = useHistory();

    const role = {
        image: profilePic,
        desc: "See who the Mafia hit is on. Poison once a game. Save once a game.",
        name: "Doctor",
        team: "Civilian",
        //abilities: []
        abilities: [{ name: "Mafia Hit", desc: "See who the mafia hit is on", type: "day" }, { name: "Save", desc: "Save one person", type: "night" }, { name: "Poison", desc: "Kill one person at night", type: "day" }]
    }

    const players = [
        {
            name: "John",
            id: 56,
            image: profilePic
        },
        {
            name: "Sarah",
            id: 22,
            image: profilePic
        },
        {
            name: "Liam",
            id: 13,
            image: profilePic
        },
        {
            name: "Karen",
            id: 91,
            image: profilePic
        }
    ];

    const getVideo = (myVideoRef) => {
        navigator.mediaDevices
            .getUserMedia({ video: { width: 300 }, audio: true })
            .then(stream => {
                let video = myVideoRef.current;
                video.srcObject = stream;
                video.muted = true;
                video.play();
            })
            .catch(err => {
                console.error("error:", err);
            });
    }

    useEffect(() => {
        if (!socket) history.push("/");

        console.log(socket);

        socket.on('user-connected', user => {
            printToConsole(`${user} has joined`);
            console.log("user has connected");
        });


    }, []);

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
                players={players}
            >
                <VideoPlayer myVideo getMyVideo={getVideo} />
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