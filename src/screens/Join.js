import React, { useState, useEffect } from 'react';
import '../css/Join.css';
import { useHistory } from 'react-router-dom';
import { getRooms } from '../util/fetch';

const Join = ({ socket }) => {
    const [username, setUsername] = useState("");
    const [roomId, setRoomId] = useState("");
    const [message, setMessage] = useState("");
    const [games, setGames] = useState([]);

    let history = useHistory();

    const update = (e) => {
        if (e.target.id === 'username') {
            setUsername(e.target.value);
        }
        if (e.target.id === 'roomId') {
            setRoomId(e.target.value);
        }
    }

    useEffect(() => {

        if (socket) {

            socket.on('room-created', data => {
                console.log("room created: ", data);
                socket.emit('join-room', data.id, data.host);
            });

            socket.on('enter-room', roomId => {
                history.push('/game/' + roomId.id);
            })
        }

        getRooms().then(data => {
            setGames(data);
        })

    }, []);



    const handleCreate = e => {
        e.preventDefault();
        if (username.trim() === '') {
            setMessage("Please enter a username");
            return;
        };
        socket.emit("createRoom", { username: username });

    }

    const handleJoin = e => {
        e.preventDefault();
        if (username.trim() === '') {
            setMessage("Please enter a username");
            return;
        };
        if (roomId.trim() === '') {
            setMessage("Please enter a Room Id");
            return;
        };

        socket.emit('join-room', roomId, username);

        console.log('join clicked: ' + roomId, username);
    }

    const handleGameSelect = g => {
        setRoomId(g.id);
    }

    return (
        <div className="join-container">

            <form>
                <label htmlFor="username">User Name</label>
                <input id="username" name="username" type="text" value={username} onChange={update} autoComplete='off' />
                <button onClick={handleCreate}>Create Room</button>
                <label htmlFor="username">Room Id</label>
                <input id="roomId" name="roomId" type="text" value={roomId} onChange={update} autoComplete='off' />
                <button onClick={handleJoin}>Join Room</button>

                <div className="join-rooms">
                    <h4>Available Games</h4>
                    <hr />
                    <div className="join-gamelist" >
                        <table>
                            <thead>
                                <tr>
                                    <th>Host</th>
                                    <th>Game ID</th>
                                </tr>

                            </thead>
                            <tbody>
                                {games.map((game, index) => {
                                    return (
                                        <tr key={index} onClick={(e) => handleGameSelect(game)}>
                                            <td>
                                                {game.host}
                                            </td>
                                            <td>
                                                {game.id}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>

                <p className="join-error">{message}</p>
            </form>


            <p>{socket.id ? "connected" : "waiting for connection"}</p>
        </div>

    );
}

export default Join;