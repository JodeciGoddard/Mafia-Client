import React, { useState, useEffect } from 'react';
import '../css/Game.css';
import Header from '../components/game-components/Header';
import Main from '../components/game-components/Main';
import profilePic from '../images/default.svg';

const Game = ({ socket }) => {

    const [events, setEvents] = useState([{ message: "empty log" }]);

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

    useEffect(() => {
        socket.on('user-connected', user => {
            var ev = [...events];
            console.log('current log: ', ev);
            ev.push({ message: `${user} has joined` });
            setEvents(ev);
            console.log("user has connected");
        });
    }, [])

    return (
        <div className="game-container">
            <Header
                role={role}
                events={events}
            />

            <Main
                role={role}
                players={players}
            />

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