import React, { useState, useEffect } from 'react';
import '../css/Lobby.css';

const Lobby = ({ leave, lobby, isVisible, isAdmin, startGame }) => {

    const [classes, setClasses] = useState(" hidden")

    useEffect(() => {

        if (isVisible) {
            setClasses("lobby-container");
            console.log("lobby data: ", lobby);
        } else {
            setClasses("hidden");
        }

    }, [isVisible, lobby])

    return (
        <div className={classes}>
            {lobby.users && <div className="lobby-form">
                <div className="lobby-heading">
                    <h5>{lobby.roomName} Player Lobby</h5>
                    <p>: {lobby.users.length} / 15</p>
                </div>
                <div className="lobby-players">
                    {lobby.users.map((user, index) => {
                        return (
                            <div key={index} className="lobby-item">
                                {user.name}
                            </div>
                        )
                    })}
                </div>
                <div className="lobby-buttons">
                    <button onClick={leave}>Leave</button>
                    {isAdmin && <button onClick={startGame}>Start Game</button>}
                </div>
            </div>}

        </div>
    );
}

export default Lobby;